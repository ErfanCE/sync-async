// * Asyncronous
// ! Problem
/*
const printMessage = (message) => {
  setTimeout(() => {
    console.log(message);
  }, Math.floor(Math.random() * 100));
};

const printAllMessages = () => {
  printMessage('1st Message');
  printMessage('2nd Message');
  printMessage('3rd Message');
  printMessage('4th Message');
};
printAllMessages();
*/

// * 1st Solution: callback function
/*
const printMessage = (message, callback) => {
  setTimeout(() => {
    console.log(message);

    callback();
  }, Math.floor(Math.random() * 100));
};

const printAllMessages = () => {
  printMessage('1st Message', () => {
    printMessage('2nd Message', () => {
      printMessage('3rd Message', () => {
        printMessage('4th Message', () => {});
      });
    });
  });
};
printAllMessages();
*/
// * 2nd Solution: Promise
/*
const printMessage = (message) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      console.log(message);
      resolve();
    }, Math.floor(Math.random() * 100));
  });
};

const printAllMessages = () => {
  printMessage('1st Message')
    .then(() => printMessage('2nd Message'))
    .then(() => printMessage('3rd Message'))
    .then(() => printMessage('4th Message'));
};
printAllMessages();
*/

// * 3rd Solution: Async-Await
const printMessage = (message) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      console.log(message);
      resolve();
    }, Math.floor(Math.random() * 100));
  });
};

const printAllMessages = async () => {
  await printMessage('1st Message');
  await printMessage('2nd Message');
  await printMessage('3rd Message');
  await printMessage('4th Message');
};
printAllMessages();
