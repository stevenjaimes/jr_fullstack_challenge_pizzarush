
import {
  // @ts-ignore
  createUserWithEmailAndPassword,
  // @ts-ignore
  signInWithEmailAndPassword,
  // @ts-ignore
  signOut,
  // @ts-ignore
  GoogleAuthProvider,
  // @ts-ignore
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { registerUserInBackend } from "../api/userApi";

interface FirebaseError {
  code: string;
  message: string;
}

export const registerWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();
    await registerUserInBackend(user.uid, user.email!, token);
    return user;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    throw new Error(firebaseError.message);
  }
};

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    throw new Error(firebaseError.message);
  }
};

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();
    await registerUserInBackend(user.uid, user.email!, token);
    return user;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    throw new Error(firebaseError.message);
  }
};

export const logout = async () => {
  await signOut(auth);
};
