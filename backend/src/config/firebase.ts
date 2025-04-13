import 'dotenv/config'; // Carga las variables de entorno
import admin from 'firebase-admin';

// Obtener la configuración desde la variable de entorno
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG || '{}');

// Validar que la variable de entorno esté configurada
if (!process.env.FIREBASE_CONFIG) {
  throw new Error('La variable de entorno FIREBASE_CONFIG no está configurada.');
}

// Inicializar Firebase Admin SDK con las credenciales
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

// Obtener una instancia de Firestore
const db = admin.firestore();
export default db;