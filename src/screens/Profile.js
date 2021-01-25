import React from 'react';

import {Button, SafeAreaView,Text} from 'react-native';
import {Auth} from 'aws-amplify';



const Profile = (props) =>{

    return(
    <SafeAreaView style ={{flex:1 ,justifyContent: 'center' , alignItems: 'center'}}>
       <Text>Profile Screen</Text> 
       <Button title ="Signout" onPress ={ ()=>Auth.signOut()} />
       <Button title ="MyInfo" onPress ={ ()=> props.navigation.navigate('MyInfo',{greeting :'Hello'})} />
    </SafeAreaView>
    );
};

export default Profile;