import admin from 'firebase-admin';
import serviceAccount from '../../pizzarush-7620e-firebase-adminsdk-fbsvc-45f40d8302.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

const db = admin.firestore();
export default db;