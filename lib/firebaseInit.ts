import { getDb } from './firebase';

let initialized = false;

export async function initializeFirebase() {
  if (initialized) return;
  try {
    // Just initialize the Firebase admin SDK - no database queries needed
    // Firebase admin SDK is lightweight and doesn't need pre-warming
    getDb();
    initialized = true;
  } catch (error) {
    console.error('Firebase init error:', error);
  }
}

// Initialize on module load (non-blocking)
if (typeof global !== 'undefined') {
  initializeFirebase().catch(() => {
    // Silently fail on init, will retry on first request
  });
}
