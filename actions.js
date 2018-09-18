export const toggleLike = () => ({ type: 'TOGGLE_LIKE' });
export const setLike = (like) => ({ type: 'SET_LIKE', like });
export const getLike = () => ({ type: "GET_LIKE" });
export const getTranslations = locale => ({ type: 'GET_TRANSLATIONS', locale });
export const setTranslations = translations => ({ type: 'SET_TRANSLATIONS', translations });
