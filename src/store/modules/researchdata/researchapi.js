import * as Realm from 'realm-web';

const appId = 'triggers_realmapp-trcon';
const app = new Realm.App({ id: appId });
const mongoClient = 'Cluster0';
const mongoDB = 'VAAHE21'

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
