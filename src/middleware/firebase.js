// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	// apiKey: 'AIzaSyC9impDYKs4JX9MRftUS_RdgXd6VHGAIBc',
	// authDomain: 'project-dmi.firebaseapp.com',
	// projectId: 'project-dmi',
	// storageBucket: 'project-dmi.appspot.com',
	// messagingSenderId: '499794031439',
	// appId: '1:499794031439:web:712792dc7be6964a3bcb3a',
	// measurementId: 'G-SVKF2PTXLG',
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
