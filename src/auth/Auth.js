import { auth } from "../firebase/config";

const FAMILY_SESSION_KEY = "family";

// This cache is only for rendering. Firestore rules authorize every request
// from the signed Firebase ID token; nothing in web storage grants access.
export const loginFamily = (family) => {
  sessionStorage.setItem(FAMILY_SESSION_KEY, JSON.stringify(family));
};

export const getFamily = () => {
  try {
    const family = sessionStorage.getItem(FAMILY_SESSION_KEY);
    return family ? JSON.parse(family) : null;
  } catch {
    return null;
  }
};

export const getLoggedFamily = () => getFamily();

export const logoutFamily = async () => {
  sessionStorage.removeItem(FAMILY_SESSION_KEY);
  await auth.signOut();
};
