import { launchCameraAsync, useCameraPermissions,PermissionStatus} from "expo-image-picker";
import { useState } from "react";
import { Alert, Button,Text ,Image,SafeAreaView,View, StyleSheet} from "react-native";
import { Colors } from "../constants/colors";
import OutlinedButton from "./UI/OutlinedButton";



function ImagePicker(){
   const [pickedImage,setPickedImage]= useState();

    const [cameraPermissionInformation,requestPremission,Permission] = useCameraPermissions()
   
    async function verifyPermission(){
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
             const permissionResponse = await  requestPremission();
             return permissionResponse.granted;
        }
        if(cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert('Insufficient Permissions!','You need to grand camera permissions');
            return false
        }
        if(cameraPermissionInformation.status === PermissionStatus.GRANTED){
             return true;
         }
     }
  async function takeImageHandler(){
  const hasPermission =   await verifyPermission();

  if(!hasPermission){
    return
  }
       const image = await  launchCameraAsync({
        allowsEditing:true,
        aspect:[16,9],
        quality:0.5
       });
       setPickedImage(image.uri)
       console.log(image)
    }
   
    let imagePreview = <Text>
      no image yet  
    </Text>

    if(pickedImage){
        imagePreview =  <Image style={styles.img} source={{uri:pickedImage}}  />
    }


   return <View>
        <View style={styles.imagePreview} >
           {imagePreview}
        </View>
        <SafeAreaView>
           <OutlinedButton icon='camera'  onPress={takeImageHandler}>Take Image</OutlinedButton>
        </SafeAreaView>
        
   </View>
}  

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview:{
       width:'100%',
       height:200,
       marginVertical:8,
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:Colors.primary100,
       borderRadius:4
    },

    img:{
        width:200,
        height:200
    }
})