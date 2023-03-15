import { launchCameraAsync, useCameraPermissions,PermissionStatus} from "expo-image-picker";
import { useState } from "react";
import { Alert, Button,Text ,Image,SafeAreaView,View, StyleSheet} from "react-native";



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
        <View>
           {imagePreview}
        </View>
        <SafeAreaView>
           <Button title="Take Image" onPress={takeImageHandler} ></Button>
        </SafeAreaView>
        
   </View>
}  

export default ImagePicker;

const styles = StyleSheet.create({
    img:{
        width:200,
        height:200
    }
})