import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from '@firebase/auth';
import {
  doc,
  DocumentReference,
  getDoc,
  getFirestore,
} from 'firebase/firestore';

import app from 'firebaseApp';
import { LoginCredentials } from 'shared/types/auth';
import { FirestoreUser, User } from 'shared/types/user';

interface AuthContextState {
  currentUser: User | null;
  error: Error | null;
  logIn: (credentials: LoginCredentials) => void;
}

export const AuthContext = createContext<AuthContextState>({
  currentUser: null,
  error: null,
  logIn: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props: AuthProviderProps) {
  const { children } = props;
  const [currentUser, setCurrentUser] =
    useState<AuthContextState['currentUser']>(null);
  const [error, setError] = useState<AuthContextState['error']>(null);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  const logIn = ({ email, password }: LoginCredentials): void => {
    void signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    return onAuthStateChanged(
      auth,
      async (user: FirebaseUser | null) => {
        console.log('test');
        if (!user || !user.email) {
          setCurrentUser(null);
          return;
        }

        const userReference = doc(
          firestore,
          `users/${user.uid}`
        ) as DocumentReference<FirestoreUser>;
        const userSnapshot = await getDoc(userReference);

        if (!userSnapshot.exists()) {
          setCurrentUser(null);
          return;
        }

        const firestoreUser = userSnapshot.data();

        setCurrentUser({
          ...firestoreUser,
          id: user.uid,
          email: user.email,
          fullName: `${firestoreUser.firstName} ${firestoreUser.lastName}`,
          createdAt: new Date(user.metadata.creationTime!).toISOString(),
          lastLoginAt: new Date(user.metadata.lastSignInTime!).toISOString(),
        });
      },
      (e) => setError(e)
    );
  }, [auth, firestore]);

  const value: AuthContextState = {
    currentUser,
    error,
    logIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
