import firebaseClient from "../auth/firebase";

export const getAuthToken = async () => {
  return await firebaseClient.auth().currentUser.getIdToken(true);
};
