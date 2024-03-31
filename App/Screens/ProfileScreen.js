import { View,ScrollView, Text,TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo'
import Colors from '../utils/Colors';
import { useClerk } from '@clerk/clerk-expo';
import { useRouter } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigator = useNavigation();
    const {signOut}=useClerk();
    const goHome=()=>{
      navigator.navigate('Home');
    }
  const {isLoaded,isSignedIn,user}=useUser();

  console.log(user.emailAddresses[0].emailAddress);
  return isLoaded&&(



    <View>

    <ScrollView>

<View style={{padding:10,width:'100%',backgroundColor:Colors.PRIMARY,height:150}}>



</View>
<View style={{alignItems:'center'}}>
<Image source={{uri:user?.imageUrl ? user?.imageUrl:'../../assets/images/avatar.png'}} style={{width:140,height:140,borderRadius:100,
  marginTop:-70}} />
                <Text style={{fontSize:25,fontFamily:'outfit-medium',padding:10}}>👤 {user?.fullName}</Text> 
                
</View>

<View style={{padding:10,backgroundColor:Colors.WHITE,margin:10,borderRadius:15,alignItems:'center'}}>
  
  <Text style={{fontSize:18,fontFamily:'outfit-medium'}}>📧 {user.emailAddresses[0].emailAddress}</Text>
  <View style={{backgroundColor:Colors.YELLOW,borderRadius:10, marginTop:10,paddingHorizontal:10, alignItems:'center'}}>
<Text style={{fontSize:18,fontFamily:'outfit-medium'}}>User</Text>
  </View>
</View>
<View style={{padding:20,margin:10,borderRadius:15,alignItems:'center'}}>
<Button title="Sign Out" color='#d60826' onPress={()=>{signOut()}}/>
</View>
<TouchableOpacity onPress={goHome} style={{alignItems:'center'}}>
<Image source={require("../../assets/images/logo.jpeg")} style={{ width:200,height:200,borderRadius:30}}/>
</TouchableOpacity>
</ScrollView>
</View>


  )
}
