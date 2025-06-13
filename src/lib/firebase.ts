import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCVBgavUlJ18KD8cY7fEBC71dXbBZ9iX-A',
	authDomain: 'next-chat-24b52.firebaseapp.com',
	projectId: 'next-chat-24b52',
	storageBucket: 'next-chat-24b52.firebasestorage.app',
	messagingSenderId: '165003422408',
	appId: '1:165003422408:web:0722a7d33ee1228bdf13fd',
	measurementId: 'G-11PK5DHJL6',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
