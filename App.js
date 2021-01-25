/**
 * Authentication with Amplify and React Native App
 *
 * @format
 * @flow strict-local
 */


import 'react-native-gesture-handler';  // keep this alway at the top
import React,{useState,useEffect} from 'react';
import {Text, View, StyleSheet, Button, Linking} from 'react-native';
import Amplify, {Auth,Hub} from 'aws-amplify';
import awsconfig from './src/aws-exports';
import {Authenticator,withOAuth} from 'aws-amplify-react-native';

import SignIn from './src/components/SignIn';
import SignUp from './src/components/SignUp';
import ForgotPassword from './src/components/ForgotPassword';
import ConfirmSigup from './src/components/ConfirmSignUp';
import ChangePassword from './src/components/ChangePassword';
import InAppBrowser from 'react-native-inappbrowser-reborn'
import Navigation from './src/components/Navigation';
import UserContext from "./src/UserContext";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

async function urlOpener(url, redirectUrl) {
  await InAppBrowser.isAvailable();
  
  const { type, url: newUrl } = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: false,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (type === 'success') {
    Linking.openURL(newUrl);
  }
}

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
  
  Analytics: {
    disabled: true,
  },
});
//Amplify.configure(awsconfig);

// Amplify.configure({
//   Auth: awsconfig,
// });

function Home(props) {
  console.log('props', props.authState);
  //console.log('props ----------authData---:', props.authData);
  return (
    //<View>
    //<Text>Welcome</Text>
   // <Button title="Sign Out" onPress={() => Auth.signOut()} />
  //</View>
    <UserContext.Provider value ={props.authData}>
      <Navigation {...props}/>
   </UserContext.Provider>
  );
}

const AuthScreens = (props) => {
  
  console.log('props', props.authState);
  switch (props.authState) {
    case 'signIn':
      return <SignIn {...props} />;
    case 'signUp':
      return <SignUp {...props} />;
    case 'forgotPassword':
      return <ForgotPassword {...props} />;
    case 'confirmSignUp':
      return <ConfirmSigup {...props} />;
    case 'changePassword':
      return <ChangePassword {...props} />;
    case 'signedIn':
      return <Home {...props}/>;
    case 'verifyContact':
      return <Home {...props}/>;  
    default:
      return <></>;
  }
};

const App = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }
  const {oAuthUser,googleSignIn,signOut,} = props;
  return (
    
    <View style={styles.container}>
      
      <Authenticator
        usernameAttributes="email"
        hideDefault={true}
        authState="signUp"
        
        >
        <AuthScreens />
      </Authenticator>
      { !user &&(
      <View style = {{marginBottom: 200}}>
        <Button title ="Login with Google" onPress = {googleSignIn}/>
      </View>
      )}
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withOAuth(App);