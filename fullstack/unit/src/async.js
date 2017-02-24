module.exports = {
    async : (value) => {
      return new Promise((resolve, reject) => {
        resolve(value);
      })
    },

    manipulateRemoteData : (url) => {
      return new Promise((resolve, reject) => {
        fetch(url)
          .then(response => response.json())
          .then(json => {
            let result = json.people.map((person) => person.name).sort();
            resolve(result);
          });
      });
    }
};
