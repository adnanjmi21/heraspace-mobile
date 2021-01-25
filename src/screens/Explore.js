import React,{ useEffect, useRef  } from 'react';

import {SafeAreaView,Text,StyleSheet, View, Image, Platform } from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken("pk.eyJ1IjoiYWRuYW5qbWkyMSIsImEiOiJja2s4Y3k0OGgwbWZ2MnBwODNqa25nZGk4In0.GOaaEKFYi9t5FhV8jBRq9w");
const Explore = (props) =>{

    return(
    <SafeAreaView style ={{flex:1 ,justifyContent: 'center' , alignItems: 'center'}}>
       
       <View style={{flex: 1, height: "100%", width: "100%" }}>
      <MapboxGL.MapView
        styleURL={MapboxGL.StyleURL.Street}
        zoomLevel={5}
        centerCoordinate={[18.837852469211384 ,38.85103985839806]}   //ionic sea
        zoomEnabled ={true}
        rotateEnabled ={true}
        compassEnabled ={true}
        //showUserLocation={true}
        style={{flex: 1}}>
          <MapboxGL.Camera
            zoomLevel={3}
            centerCoordinate={[18.837852469211384 ,38.85103985839806]}
          >
          </MapboxGL.Camera>
      </MapboxGL.MapView>
    </View>
    </SafeAreaView>
    );
};
export default Explore;