import { initializeApp, getApps, getApp, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let firestoreInstance: FirebaseFirestore.Firestore | null = null;

interface ServiceAccountKey {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

function initFirebaseAdmin(): FirebaseFirestore.Firestore {
  if (firestoreInstance) {
    return firestoreInstance;
  }

  let app: App;

  if (getApps().length === 0) {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY || process.env.FIREBASE_SERVICES_KEY;
    
    // During build time on Vercel, Firebase key may not be available - that's ok
    if (!serviceAccountKey) {
      if (process.env.VERCEL_ENV === 'preview' || process.env.VERCEL_ENV === 'production') {
        // Build time on Vercel - skip initialization for now
        throw new Error('Firebase credentials not available during build. Please ensure FIREBASE_SERVICE_ACCOUNT_KEY is set in Vercel environment variables.');
      }
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY or FIREBASE_SERVICES_KEY environment variable is not set. Please add your Firebase service account key in the Secrets tab.');
    }

    try {
      let parsedKey: ServiceAccountKey;
      
      // Clean the key - remove control characters that break JSON parsing
      let cleanedKey = serviceAccountKey.trim();
      
      // Validate key length (Firebase keys are typically 2000+ chars)
      if (cleanedKey.length < 1000) {
        throw new Error('Service account key appears to be incomplete or invalid');
      }
      
      // Try to parse as JSON first
      if (cleanedKey.startsWith('{')) {
        // Replace actual newlines/returns in the JSON with escaped versions for parsing
        cleanedKey = cleanedKey.replace(/\r?\n/g, '\\n').replace(/\t/g, '\\t');
        parsedKey = JSON.parse(cleanedKey);
      } else {
        // Try base64 decoding
        const decoded = Buffer.from(cleanedKey, 'base64').toString('utf-8');
        parsedKey = JSON.parse(decoded);
      }

      // Validate required fields
      if (!parsedKey.type || !parsedKey.project_id || !parsedKey.private_key || !parsedKey.client_email) {
        throw new Error('Service account key missing required fields');
      }

      // Fix: Replace escaped newlines with actual newlines in private key
      const privateKey = parsedKey.private_key.replace(/\\n/g, '\n');

      app = initializeApp({
        credential: cert({
          projectId: parsedKey.project_id,
          clientEmail: parsedKey.client_email,
          privateKey: privateKey,
        }),
        projectId: parsedKey.project_id,
      });
    } catch (error) {
      // Don't log the actual error or key in production
      const message = process.env.NODE_ENV === 'production' 
        ? 'Failed to initialize Firebase' 
        : `Error parsing Firebase service account: ${error}`;
      throw new Error(message);
    }
  } else {
    app = getApp();
  }
  
  firestoreInstance = getFirestore(app, '(default)');
  return firestoreInstance;
}

export function getDb(): FirebaseFirestore.Firestore {
  return initFirebaseAdmin();
}

export const EMAIL_DOMAINS = [
  'giftofhope.online',
  'kameti.online',
  'playgamesonline.space',
  'mytoolhub.store'
];

const ADJECTIVES = ['swift', 'bright', 'cool', 'fast', 'quick', 'smart', 'happy', 'brave', 'calm', 'eager', 'strong', 'light', 'dark', 'blue', 'green', 'red', 'gold', 'silver', 'sharp', 'kind'];
const NOUNS = ['tiger', 'eagle', 'shark', 'lion', 'wolf', 'bear', 'hawk', 'fox', 'owl', 'lynx', 'panda', 'dragon', 'phoenix', 'swan', 'falcon', 'raven', 'horse', 'zebra', 'cheetah', 'panther'];

export function generateRandomEmail(): string {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  // Generate 3-4 digit number for a cleaner look
  const number = Math.floor(Math.random() * 9000) + 1000;
  // Randomly add underscore or dot for variation
  const separator = Math.random() > 0.5 ? '_' : '.';
  const domain = EMAIL_DOMAINS[Math.floor(Math.random() * EMAIL_DOMAINS.length)];
  
  // Mix format: simplified for better readability
  const formats = [
    `${adjective}${noun}${number}@${domain}`,
    `${adjective}${separator}${noun}@${domain}`,
    `${adjective}${noun}@${domain}`,
  ];
  
  return formats[Math.floor(Math.random() * formats.length)];
}

export function getExpirationTime(): Date {
  return new Date(Date.now() + 24 * 60 * 60 * 1000);
}

// Client-side Firebase functions for feedback
export async function saveFeedbackToFirestore(feedback: {
  name: string;
  rating: number;
  message: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}) {
  try {
    const db = getDb();
    const docRef = await db.collection('feedback').add({
      ...feedback,
      timestamp: new Date(),
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving feedback to Firestore:', error);
    throw error;
  }
}

export async function loadFeedbackFromFirestore() {
  try {
    const db = getDb();
    const snapshot = await db.collection('feedback')
      .orderBy('timestamp', 'desc')
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.() || new Date(doc.data().timestamp)
    }));
  } catch (error) {
    console.error('Error loading feedback from Firestore:', error);
    return [];
  }
}
