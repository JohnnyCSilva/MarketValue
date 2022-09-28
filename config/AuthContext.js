import { createContext, useContext, useEffect, useState } from 'react';
import { signInWithPopup, getAuth, GoogleAuthProvider, signOut, onAuthStateChanged} from 'firebase/auth';
import app from './Firebase';

const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return unsubscribe;
    }, [])

    const logIn = async() => {
        try {
            await signInWithPopup(auth, new GoogleAuthProvider())
            .then((result) => {
                console.log(result);
                window.location = '/';
            })
        } catch (error) {
            console.log(error);
        }  
    }

    const logOut = async() => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }  
    }

    return (
        <AuthContext.Provider value={{
            user, logIn, logOut
        }}>
            {children}
        </AuthContext.Provider>
    );
    };

    const useAuth = () => {
    return useContext(AuthContext);
    }

export { AuthProvider, useAuth };