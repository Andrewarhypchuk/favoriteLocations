import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import AddPlace from './screens/AddPlace';
import { Colors } from './constants/colors';
import AllPlaces from './screens/AllPlaces';
import IconButton from './components/UI/IconButton';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <StatusBar  />
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle:{
          backgroundColor:Colors.primary500
        },
        headerTintColor:Colors.gray700,
        contentStyle:{
           backgroundColor:Colors.gray700
        }
      }}>
        <Stack.Screen name='AllPlaces' component={AllPlaces} options={({navigation})=>({
          title:'Your favorite Places',
          headerRight:( {tintColor}) => (<IconButton 
             icon="add" 
             size={24} 
             color={tintColor} 
             onPress={()=>{navigation.navigate('AddPlace')}} 
             />
          ),
        })}
         />
        <Stack.Screen name='AddPlace' component={AddPlace} options={{
          title:'Add a new Place'
        }} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

