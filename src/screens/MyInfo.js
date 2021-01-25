import React from 'react';

import {SafeAreaView,Text} from 'react-native';

const MyInfo = (props) =>{

    return(
    <SafeAreaView style ={{flex:1 ,justifyContent: 'center' , alignItems: 'center'}}>
       <Text>Myinfo Screen</Text> 
    </SafeAreaView>
    );
};

export default MyInfo;