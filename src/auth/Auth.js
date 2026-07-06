export const loginFamily =
(family) => {

localStorage.setItem(
"family",
JSON.stringify(family)
);

};




export const getFamily =
() => {

const family =
localStorage.getItem(
"family"
);


if(!family){

return null;

}


return JSON.parse(
family
);

};




// OLD COMPONENT SUPPORT

export const getLoggedFamily =
() => {

return getFamily();

};




export const logoutFamily =
() => {

localStorage.removeItem(
"family"
);

};