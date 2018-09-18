const request = (url, method = "GET") => {
  return fetch(url, { method }).then(r => {
    if (r.status >= 200 && r.status < 300) {
      return r.json();
    }
    
    throw r.status;
  });
};

const api = {
  toggleLike() {
    let url = "http://localhost:8080/like";

    const fail = document.querySelector("#fail").checked;
    if (fail) {
      url += "?fail=true";
    }

    return request(url, "POST");
  },

  getLike() {
    return request("http://localhost:8080/like");
  },

  getTranslations(locale) {
    return request(`http://localhost:8080/translations/${locale}`);
  },
};

export default api;
