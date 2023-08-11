import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyaLHNR9FSAkZC-_KSeBnK-y_PhieI2w4",
  authDomain: "chajosh-87ed6.firebaseapp.com",
  projectId: "chajosh-87ed6",
  storageBucket: "chajosh-87ed6.appspot.com",
  messagingSenderId: "1078814371116",
  appId: "1:1078814371116:web:6854071c8e004fb28c1089"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };