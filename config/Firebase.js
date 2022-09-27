import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHhoo7K8FeTgn09LIOdvRnesJWG23zKLM",
  authDomain: "marketvalue-1.firebaseapp.com",
  projectId: "marketvalue-1",
  storageBucket: "marketvalue-1.appspot.com",
  messagingSenderId: "299043931076",
  appId: "1:299043931076:web:3b23c063a900a431475a91"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default app;