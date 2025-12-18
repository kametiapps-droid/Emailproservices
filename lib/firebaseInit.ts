import { getDb } from './firebase';

let initialized = false;

export async function initializeFirebase() {
  if (initialized) return;
  try {
    const db = getDb();
    // Warm up connection
    await db.collection('temp_emails').limit(1).get();
    initialized = true;
  } catch (error) {
    console.error('Firebase init error:', error);
  }
}

// Initialize on module load
if (typeof global !== 'undefined') {
  initializeFirebase().catch(console.error);
}
