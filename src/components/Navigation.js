
import React from 'react';

import {NavigationContainer} from'@react-navigation/native';
import  {createStackNavigator} from '@react-navigation/stack';
import  {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import IonicIcon from 'react-native-vector-icons/Ionicons';

import {Text, Dimensions} from 'react-native';

import Home from '../screens/Home';
import About from '../screens/About';
import '../screens/Profile';
import '../screens/MyInfo';
import Profile from '../screens/Profile';
import MyInfo from '../screens/MyInfo';
import Explore from '../screens/Explore';

const fullScreenWidth = Dimensions.get('window').width;

//create stacks to hold each screen
const Stack = createStackNavigator();

function HomeStackScreen() {

    return (
        <Stack.Navigator>
                <Stack.Screen name ="Home" component ={Home}/>
        </Stack.Navigator>
    );
}

function AboutStackScreen() {

    return (
        <Stack.Navigator>
                <Stack.Screen name ="About" component ={About}/>
        </Stack.Navigator>
    );
}
function ExploreStackScreen() {

    return (
        <Stack.Navigator>
                <Stack.Screen name ="Explore" component ={Explore}/>
        </Stack.Navigator>
    );
}
function ProfileStackScreen() {

    return (
        <Stack.Navigator>
                <Stack.Screen name ="Profile" component ={Profile}/>
                <Stack.Screen name ="MyInfo" component ={MyInfo}/>
        </Stack.Navigator>
    );
}

// create bottom tabs 

const Tab = createBottomTabNavigator();

export default function Navigation (props) {

    return(
        <NavigationContainer>
            <Tab.Navigator
            screenOptions = {({route}) =>({
                headerTitle: () => <Text>Header</Text>,
                tabBarIcon : ({focused,color , size, padding}) =>{
                    let iconName;
                    if(route.name === 'Home'){
                     iconName = focused ? 'home' :'home-outline'
                    }else if ( route.name === 'About'){
                        iconName = focused ?'information-circle' : 'information-circle-outline';
                    }else if (route.name === 'Profile'){
                        iconName = focused ? 'person' : 'person-outline';
                    }else if (route.name === 'Explore'){
                        iconName = focused ? 'location' : 'location-outline';
                    }

                    return(
                        <IonicIcon name ={iconName}  size ={size} color ={color} style ={{paddingBottom : padding}}/>
                    )
                }, 

            })}
            tabBarOptions={{
                activeTintColor : 'lightseagreen',
                inactiveTintcolor : 'grey',
                labelStyle : {fontSize: 16},
                style: {width : fullScreenWidth}


            }}
            >
                <Tab.Screen name = "Home" component ={HomeStackScreen}/>
                <Tab.Screen name = "Explore" component ={ExploreStackScreen}/>
                <Tab.Screen name = "Profile" component ={ProfileStackScreen}/>
                <Tab.Screen name = "About" component ={AboutStackScreen}/>
                
            </Tab.Navigator>
        </NavigationContainer>
    );

} 
