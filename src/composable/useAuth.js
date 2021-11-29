import { ref, watch } from "vue";
import { useStore } from "vuex";
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
    console.log("dvdb - googleLogin - credentials", credentials);
    if (credentials.user) {
      isAuthenticated.value = true;
      user.value = credentials.user.displayName;
    }
  };

  const login = async (username, password) => {
    // @Christie: this debugger is hit
    debugger;
    // So I use a try catch block here to see if I can catch an error,
    // an error between here and that next break-point.
    try {
      const credentials = await signInWithEmailAndPassword(
        firebaseAuth,
        username,
        password
      );

      if (credentials.user) {
        isAuthenticated.value = true;
        user.value = credentials.user.email;
      }
    } catch (error) {
      console.error("dvdb - login - error", error);
      // Sure enough: this error logs out just before this debugger hits.
      // Error is: FirebaseError: Firebase: Error (auth/user-not-found)
      // So one of the regular jobs of a FE Dev, is to parse these error messages,
      // and make them part of the UX.
      // You know, like how google log-in guides you through the form filling.
      // That's where components like these come in handy: https://tailwindui.com/components/application-ui/feedback/alerts
      debugger;
    }
    // but this one isn't hit. So the problem is between these two debugger-break-points.
    debugger;
  };

  const signup = async (username, password) => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        firebaseAuth,
        username,
        password
      );

      if (credentials.user) {
        isAuthenticated.value = true;
        user.value = credentials.user.email;
      }
    } catch (error) {
      console.error("dvdb - login - error", error);
      debugger;
    }
    debugger;
  };

  const store = useStore();
  debugger;
  watch(isAuthenticated, (value) => {
    store.commit("set", { property: "isLoggedIn", value: value });

    const result = store.state.isLoggedIn;
    console.log("store.state.isLoggedIn: ", result);
  });

  const logout = async () => {
    await signOut(firebaseAuth);
    isAuthenticated.value = false;
    user.value = "";
  };

  return { isAuthenticated, login, signup, logout, user, googleLogin };
};

export default useAuth;
