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
    
    if (!serviceAccountKey) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY or FIREBASE_SERVICES_KEY environment variable is not set. Please add your Firebase service account key in the Secrets tab.');
    }

    try {
      let parsedKey: ServiceAccountKey;
      
      if (serviceAccountKey.startsWith('{')) {
        parsedKey = JSON.parse(serviceAccountKey);
      } else {
        const decoded = Buffer.from(serviceAccountKey, 'base64').toString('utf-8');
        parsedKey = JSON.parse(decoded);
      }

      console.log('Initializing Firebase with project:', parsedKey.project_id);

      app = initializeApp({
        credential: cert({
          projectId: parsedKey.project_id,
          clientEmail: parsedKey.client_email,
          privateKey: parsedKey.private_key,
        }),
        projectId: parsedKey.project_id,
      });
      console.log('Firebase Admin initialized successfully');
    } catch (error) {
      console.error('Error parsing Firebase service account:', error);
      throw new Error('Failed to initialize Firebase. Please check your service account key format.');
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
  'kameti.online'
];

const ADJECTIVES = ['swift', 'bright', 'cool', 'fast', 'quick', 'smart', 'happy', 'brave', 'calm', 'eager'];
const NOUNS = ['tiger', 'eagle', 'shark', 'lion', 'wolf', 'bear', 'hawk', 'fox', 'owl', 'lynx'];

export function generateRandomEmail(): string {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const number = Math.floor(Math.random() * 9999);
  const domain = EMAIL_DOMAINS[Math.floor(Math.random() * EMAIL_DOMAINS.length)];
  return `${adjective}${noun}${number}@${domain}`;
}

export function getExpirationTime(): Date {
  return new Date(Date.now() + 24 * 60 * 60 * 1000);
}
