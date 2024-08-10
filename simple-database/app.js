// users.json => [{username, age, gender}, {}, {}]

const { readFile, writeFile, access, constants } = require('node:fs/promises');
const datasetsPath = ['usernames.txt', 'gender.txt', 'ages.txt'];

const extractUserProperty = async (datasets) => {
  try {
    await Promise.all(datasetsPath.map((path) => access(path, constants.F_OK)));

    const pendingDatasets = datasets.map((datasetFilePath) => {
      return readFile(datasetFilePath, 'utf-8');
    });

    let usersData = await Promise.all(pendingDatasets);

    usersData = usersData.map((userData) => {
      return userData.split('\n').filter((item) => item);
    });

    return usersData;
  } catch (err) {
    throw err;
  }
};

const formatUsersProperty = (property, propertyName) => {
  return property.map((item) => {
    const [uid, userProperty] = item.split('-');
    const propertyObject = { uid };
    propertyObject[propertyName] = userProperty;

    return propertyObject;
  });
};

const main = async () => {
  const [username, gender, age] = await extractUserProperty(datasetsPath);

  const usernames = formatUsersProperty(username, 'username');
  const genders = formatUsersProperty(gender, 'gender');
  const ages = formatUsersProperty(age, 'age');

  const users = usernames.map(({ uid, username }) => {
    const { age = null } = ages.find((item) => uid === item.uid) ?? {};
    const { gender = null } = genders.find((item) => uid === item.uid) ?? {};

    return { uid, username, gender, age };
  });

  await writeFile('./users.json', JSON.stringify(users));
};
main().catch(console.error);

// Query => user age > 25 & male
