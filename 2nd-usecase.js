// * Syncronous
/*
const printMessage = () => {
  console.log('1st message');
  console.log('2nd message');
};

console.log('Start {');

console.log('hello world!');

printMessage();

console.log('End }');
*/

// * Asyncronous
/*
// - top-level(Global)
console.log('Start {');

setTimeout(() => console.log('from setTimeout > 1st Message'), 0);

console.log('2nd Message');

console.log('End }');
*/

// * Async usage: eventListener
/*
console.log('start');
document.getElementById('button').addEventListener('click', () => {
  console.log('1st');
});
console.log('end');
*/

// * callback
// ! all callbacks not async
/*
const messages = ['first', 'second', 'third'];

console.log('start');

messages.forEach((message) => console.log(message));

console.log('end');
*/

// ! Problem
/*
const loginUser = (username, password) => {
  setTimeout(() => {
    // login logic code: check username & password

    console.log('data recived now!');

    return { email: username };
  }, 5000);
};

const userProfile = loginUser('erfan@jmail.com', '12345678');
console.log(userProfile);
*/

// * solution: callback
/*
const loginUser = (username, password, cb) => {
  setTimeout(() => {
    // login logic code: check username & password

    console.log('data recived now!');

    cb({ email: username });
  }, 5000);
};

loginUser('erfan@jmail.com', '12345678', (userProfile) => {
  console.log(userProfile);
});
*/

// * Callback Advanced
/*
const login = (username, password, callback) => {
  if (!username || !password) {
    return console.log('inavlid username or password');
  }

  setTimeout(() => {
    console.log('you are logged in successfully.');

    callback({ email: username });
  }, 1500);
};

const userArticles = (email, callback) => {
  if (!email) return console.log('invalid user email');

  setTimeout(() => {
    console.log('your articles: ');
    const articles = ['article1', 'article2', 'article3'];

    callback(articles);
  }, 2000);
};

const articleDetail = (article, callback) => {
  if (!article) return console.log('invalid article');

  setTimeout(() => {
    callback('article detail');
  }, 1000);
};

// consume
login('behnam@Gahoo.com', '12345678', (userInfo) => {
  const { email } = userInfo;

  userArticles(email, (articles) => {
    articles.forEach((article) => {
      articleDetail(article, (detail) => {
        console.log(`${article}: ${detail}`);
      });
    });
  });
});
*/

// * Promise
const login = (username, password) => {
  return new Promise((resolve, reject) => {
    if (!username || !password) {
      reject(new Error('inavlid username or password'));
    }

    setTimeout(() => {
      console.log('you are logged in successfully.');

      resolve({ email: username });
    }, 1500);
  });
};

const userArticles = (email) => {
  return new Promise((resolve, reject) => {
    if (!email) {
      reject(new Error('invalid user email'));
    }

    setTimeout(() => {
      console.log('your articles: ');
      const articles = ['article1', 'article2', 'article3'];

      resolve(articles);
    }, 2000);
  });
};

const articleDetail = (article) => {
  return new Promise((resolve, reject) => {
    if (!article) {
      reject(new Error('invalid article'));
    }

    setTimeout(() => {
      resolve('article detail');
    }, 1000);
  });
};

/*
login('behnam@Gahoo.com', '1234')
  .then((email) => {
    return userArticles(email);
  })
  .then((articles) => {
    articles.forEach((article) => {
      articleDetail(article).then((detail) => {
        console.log(`${article}: ${detail}`);
      });
    });
  })
  .catch(console.error);
*/

const userDashboard = async () => {
  const { email } = await login('behnam@Gahoo.com', '1234');
  const articles = await userArticles(email);

  for (const article of articles) {
    const detail = await articleDetail(article);
    console.log(`${article}: ${detail}`);
  }
};
userDashboard().catch(console.error);
