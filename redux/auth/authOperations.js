
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice, } from "./authReducer";

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      console.error(error.message);
    }
  };

export const authSignUpUser =
  ({ username, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const currentUser = await auth.currentUser;

      await updateProfile(currentUser, {
        displayName: username,
      });
      const { displayName, uid } = await auth.currentUser;
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          nickname: displayName,
        })
      );
    } catch (error) {
      console.error(error);
      console.error(error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await auth.signOut()
    dispatch(authSlice.actions.auhtSignOut());
  } catch (error) {
    console.error(error);
    console.error(error.message);
  }
};
export const authStateChangeUser = () => async (dispatch, getState) => {
  await auth.onAuthStateChanged((user) => {
    const { displayName, uid } = auth.currentUser;
    if (user) {
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          nickname: displayName,
        })
      );
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};
