/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';

Icon.loadFont();
IonicIcon.loadFont();
AppRegistry.registerComponent(appName, () => App);
