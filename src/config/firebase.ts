import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { env } from './env';

export const initializeFirebaseAdmin = (): void => {
  if (getApps().length > 0) return;

  const { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID } = env;

  if (!FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY || !FIREBASE_PROJECT_ID) {
    throw new Error("Falha ao iniciar Firebase - Faltando as credenciais");
  }

  try {
    initializeApp({
      credential: cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
    console.log("Firebase Admin inicializado com sucesso! 🔥");
  } catch (err) {
    console.error("❗Falha ao conectar ao Firebase", err);
    process.exit(1);
  }
};