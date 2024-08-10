// 4s
const userVideos = (username) => {
  return new Promise((resolve, reject) => {
    if (!username) return reject('invalid username(videos)');

    setTimeout(() => {
      const videos = ['video1', 'video2', 'video3', 'video4'];

      resolve(videos);
    }, 10000);
  });
};

// 2s
const userArticles = (username) => {
  return new Promise((resolve, reject) => {
    if (!username) return reject('invalid username(articles)');

    setTimeout(() => {
      const articles = ['article1', 'article2', 'article3'];

      resolve(articles);
    }, 2000);
  });
};

// userVideos('behnam').then(console.log).catch(console.error); // 4s (resolve)
// userArticles('erfan').then(console.log).catch(console.error); // 2s (resolve)

// * Promise All
// 4s
// Promise.all([userVideos('erfan'), userArticles('behnam')])
//   .then((response) => console.log(response))
//   .catch(console.error);

// * Promise Race
// 1s
const serverA = (username) => {
  return new Promise((resolve, reject) => {
    if (!username) return reject('invalid');

    setTimeout(() => {
      const userData = { email: username };

      resolve(userData);
    }, 1000);
  });
};

// 10s
const serverB = (username) => {
  return new Promise((resolve, reject) => {
    if (!username) return reject('invalid');

    setTimeout(() => {
      const userData = { email: username };

      resolve(userData);
    }, 10000);
  });
};

Promise.race([serverA('behnam'), serverB('behnam')])
  .then((user) => console.log(user))
  .catch(console.error);
