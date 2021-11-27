import { ref, watch } from "vue";
import {useStore} from "vuex";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
/**
 * This imports the Auth object https://firebase.google.com/docs/reference/js/auth.auth.md#auth_interface
 */
import { firebaseAuth } from "./useFirebase";


const isAuthenticated = ref(false);

const user = ref("");

const useAuth = () => {
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const credentials = await signInWithPopup(firebaseAuth, provider);
    // @Christie: see how much usefull info comes back?
    console.log("dvdb - googleLogin - credentials", credentials)
    if (credentials.user) {
      isAuthenticated.value = true;
      user.value = credentials.user.displayName;
    }
  };

  const login = async (username, password) => {
    const credentials = await signInWithEmailAndPassword(
      firebaseAuth,
      username,
      password
      );
      
      if (credentials.user) {
        isAuthenticated.value = true;
        user.value = credentials.user.email;
      }
    };
    
    const signup = async (username, password) => {
      const credentials = await createUserWithEmailAndPassword(
        firebaseAuth,
        username,
        password
        );
        
        if (credentials.user) {
          isAuthenticated.value = true;
          user.value = credentials.user.email;
        }
      };

      const store = useStore();
      watch(isAuthenticated, (value) => {
        store.commit('set', { property: "isLoggedIn", value: value });
        
        const result = store.state.isLoggedIn
        console.log("store.state.isLoggedIn: ", result)
        
      })
      
      const logout = async () => {
        await signOut(firebaseAuth);
        isAuthenticated.value = false;
        user.value = "";
      };
      
      return { isAuthenticated, login, signup, logout, user, googleLogin };
};

export default useAuth;
