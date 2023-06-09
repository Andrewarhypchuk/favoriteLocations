import { Alert,Text, StyleSheet,Image, View } from "react-native";
import { Colors } from "../constants/colors";
import OutlinedButton from "./UI/OutlinedButton";
import {getCurrentPositionAsync, useForegroundPermissions,PermissionStatus} from 'expo-location'
import { useState } from "react";
import { getMapPreview } from "../util/locations";

function LocationPicker(){
    const [pickedLocation,setPickedLocation] =  useState();
    const [locationPermissionInformation , requestPermission] = useForegroundPermissions()
   async function verifyPermissions(){
    if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
        const permissionResponse = await  requestPermission();
        return permissionResponse.granted;
   }
   if(locationPermissionInformation.status === PermissionStatus.DENIED){
       Alert.alert('Insufficient Permissions!','You need to grand location permissions');
       return false
   }
   if(locationPermissionInformation.status === PermissionStatus.GRANTED){
        return true;
    }
   }

   async function getLocationHandler(){

     const hasPermission = await verifyPermissions();
     if(!hasPermission){
          return;
     }
     const location = await getCurrentPositionAsync();
     setPickedLocation({
        lat:location.coords.latitude ,
        lng:location.coords.longitude ,
     })
    }
    function pickOnMapHandler(){


    }
    let locationPreview = <Text>No location picked yet</Text>
      if(pickedLocation){
        locationPreview = <Image style={styles.image} source={{uri:getMapPreview(pickedLocation.lat,pickedLocation.lng)}} />
      }

    return <View>
        <View style={styles.mapPreview} >
           {locationPreview}
        </View>
        <View style={styles.actions} >
            <OutlinedButton icon='location' onPress={getLocationHandler} >Locate User</OutlinedButton>
            <OutlinedButton icon='map' >Pick on Map</OutlinedButton>
        </View>
    </View>
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview:{
    width:'100%',
    height:200,
    marginVertical:8,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.primary100,
    borderRadius:4
  },
  actions:{
     flexDirection:'row',
     justifyContent:'space-around',
     alignItems:'center'
  },
  image:{
    width:100,
    height:100
  }

})