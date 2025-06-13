import { auth } from '@/lib/firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth';

export const registerUser = async (
	email: string,
	password: string,
	username: string
) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;

		await updateProfile(user, { displayName: username });

		return user;
	} catch (error) {
		console.error('Ошибка регистрации:', error);
		throw error;
	}
};

export const loginUser = async (email: string, password: string) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		return userCredential.user;
	} catch (error) {
		console.error('Ошибка входа:', error);
		throw error;
	}
};

export const logoutUser = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.error('Ошибка выхода:', error);
		throw error;
	}
};
