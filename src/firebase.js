const { initializeApp, getApps, getApp } = require("firebase/app");
const { getAuth, connectAuthEmulator } = require("firebase/auth");
const { getDatabase, connectDatabaseEmulator } = require("firebase/database");
const { getFunctions, connectFunctionsEmulator } = require("firebase/functions");
const dotenv = require("dotenv");

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const database = getDatabase(app);
const functions = getFunctions(app);

// Use emulators in development
if (location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectDatabaseEmulator(database, "localhost", 9000);
  connectFunctionsEmulator(functions, "localhost", 5001);
}

module.exports = { app, auth, database, functions };