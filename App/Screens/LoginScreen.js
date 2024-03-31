import { View, Text, TouchableOpacityBase } from 'react-native'
import React from 'react'
import temp from '../../assets/images/temp.jpeg'
import google from '../../assets/images/google.png'
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Colors from '../utils/Colors';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import AppImage from '../../assets/images/app.jpeg'
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {

  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
 
  return (
    <View style={{display:'flex',alignItems:'center'}}>
      <Image source={AppImage}
      style={{width: 210, height: 450, objectFit:'contain',marginTop:100,borderColor:Colors.BLACK,
      borderRadius:30,
      borderWidth:3
      }}/>

      <View style={{
            height:400,
            backgroundColor:Colors.PRIMARY,
            width:'100%',
            marginTop:-100, 
            padding:20,
        }}>

        <Text style={{textAlign:'center',
    fontSize:35, color:Colors.WHITE,marginTop:50,
    fontFamily:'outfit-bold'}}>GUIDE ME</Text>

        <Text style={{textAlign:'center',
    fontSize:20,marginTop:20,
    color:Colors.LIGHT_PRIMARY,
    fontFamily:'outfit'}}>Level Up Your Career Game</Text>
       
        <TouchableOpacity
        onPress={onPress}
        style={{backgroundColor:Colors.WHITE, display:'flex',
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',gap:10,justifyContent:'center',
        padding:10,
        borderRadius:99
    }}> 
             <Image source={google}
             style={{
                width: 30, height: 30 
             }}/>

             <Text style={{fontSize:20, color:Colors.PRIMARY,
             fontFamily:'outfit'}}>Sign In with Google</Text>
        </TouchableOpacity>

     </View>
    </View>
  )
}