import express from 'express';
import  db  from '../config/firebase';
import * as admin from 'firebase-admin';

const router = express.Router();

router.post('/register-user', async (req, res) => {
  const { uid, email } = req.body;

  try {
 
    await db.collection('users').doc(uid).set({
      email,
      role: 'cliente',
      createdAt: new Date()
    });

    res.status(200).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al guardar usuario:', error);
    res.status(500).json({ message: 'Error interno al guardar usuario' });
  }
});


router.post('/assign-role', async (req, res) => {
  const { uid, role } = req.body;

  console.log('UID:', uid);
console.log('ROLE:', role);
  try {
    // asignar custom claim
    await admin.auth().setCustomUserClaims(uid, { admin: role === 'admin' });

    res.status(200).json({ message: `Rol ${role} asignado al usuario correctamente.` });
  } catch (error) {
    console.error('Error al asignar role:', error);
    res.status(500).json({ message: 'Error interno al asignar role' });
  }
});


export default router;
