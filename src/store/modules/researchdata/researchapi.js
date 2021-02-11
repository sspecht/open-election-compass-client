import * as Realm from 'realm-web';

const appId = process.env.VUE_APP_API_APPID;
const app = new Realm.App({ id: appId });
const mongoClient = process.env.VUE_APP_API_MONGOCLIENT;
const mongoDB = process.env.VUE_APP_API_MONGODB;

const researchapiuser = () => {
  // Create an anonymous credential
  const credentials = Realm.Credentials.anonymous();
  const createPseudonym = async () => {
    try {
      const usr = await app.logIn(credentials);
      return usr;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to create pseudonym', err);
    }
    return null;
  };
  return createPseudonym();
};

// export const fetchConfig = async (key) => {
//   const configs = app.currentUser.mongoClient(mongoClient).db(mongoDB).collection('Configs');
//   const conf = await configs.findOne({ config: key });
//   return conf;
// };

export const storeResults = async (result) => {
  await researchapiuser();
  const results = app.currentUser.mongoClient(mongoClient).db(mongoDB).collection('Results');
  const resultId = await results.insertOne({ document: { pseudonym: app.currentUser.id, ...result } });
  return resultId;
}

export default storeResults;
