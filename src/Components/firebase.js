import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBXapLI6Gkr1cx44RlQGodXVziFmktytew",
  authDomain: "chat-app-42e3f.firebaseapp.com",
  projectId: "chat-app-42e3f",
  storageBucket: "chat-app-42e3f.appspot.com",
  messagingSenderId: "233146413415",
  appId: "1:233146413415:web:6753d901ea77e6f713ffc2"
};

const app = initializeApp(firebaseConfig);

export default app;