import { Client, Configuration } from 'bugsnag-react-native';

const configuration = new Configuration();
configuration.apiKey = '';
configuration.notifyReleaseStages = ['production', 'testflight'];

const bugsnag = new Client(configuration);

export default bugsnag;
