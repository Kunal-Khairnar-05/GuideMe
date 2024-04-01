import React from 'react'
import { View, Text, TextInput,TouchableOpacity} from 'react-native'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../utils/Colors'
// import Coin from '../../../assets/images/bitcoin.png'
import { Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import AppLogo from '../../../assets/images/guide.png'
export default function Header() {

   const navigation=useNavigation();
   const {isLoaded,isSignedIn,user}=useUser();
    return isLoaded&&(

        <View>
    <View style={[{justifyContent:'space-between'},styles.rowStyle]}>
      <View style={styles.rowStyle}>  

            <Image source={{uri:user?.imageUrl}}
            
            style={{width:50,height:50,borderRadius:99}}/>
            <View>

                <Text style={{color:Colors.WHITE,fontFamily:'outfit'}}>Welcome</Text>

                <Text style={styles.mainText}>{user?.fullName}</Text>
                    
                </View>
      </View>

      <View style={styles.rowStyle}>
        <View style={{backgroundColor:Colors.BLACK,borderRadius:15,padding:3}}>
    <Image source={AppLogo} style={{width:93,height:30,borderRadius:99}}/>  
        </View>
        </View>
    </View>


    </View>
    )
  }

   const styles = StyleSheet.create({
    mainText:{
        color:Colors.WHITE,fontSize:20,
                    fontFamily:'outfit',
    },
    rowStyle:{
        display:'flex',flexDirection:'row',gap:10,
        alignItems:'center'
    }
   })

