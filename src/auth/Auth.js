// src/auth/Auth.js

export const loginFamily = (family) => {
  localStorage.setItem(
    "loggedFamily",
    JSON.stringify(family)
  );
};

export const logoutFamily = () => {
  localStorage.removeItem(
    "loggedFamily"
  );
};

export const getLoggedFamily = () => {
  const family =
    localStorage.getItem(
      "loggedFamily"
    );

  return family
    ? JSON.parse(family)
    : null;
};

export const isLoggedIn = () => {
  return (
    getLoggedFamily() !== null
  );
};