import admin from "firebase-admin";
import {serviceAccount} from '../db/config.js'

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export const firestoreDatabase = admin.firestore();


