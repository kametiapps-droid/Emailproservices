import { getDb } from './firebase';

let initialized = false;

export async function initializeFirebase() {
  if (initialized) return;
  try {
    getDb();
    initialized = true;
  } catch {
    // Silently fail on init, will retry on first request
  }
}
