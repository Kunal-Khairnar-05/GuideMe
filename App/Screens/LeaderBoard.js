import React from 'react'
import { View, Text,Linking ,Button, Image} from 'react-native'
import { TouchableOpacity } from 'react-native'
import Colors from '../utils/Colors'
import * as MailComposer from 'expo-mail-composer';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import CourseList from '../Components/HomeScreen/CourseList';
import OptionItem from '../Components/CourseDetailScreen/OptionItem';
export default function LeaderBoard({course}) {


const openEmail= ()=>{
  MailComposer.composeAsync({
    subject:'Requesting for G-Meet link',
    body:'Hi there,\n \n Successfully Purchased Your Guidence Course. Please Provide me the G-Meet Link for the same.\n\n\n_________________\n \n👨‍🎓For Guide: \n  Schedule Meet here:\n\n https://calendar.google.com/calendar/u/0/r/eventedit?vcon=meet&dates=now&hl=en-GB&pli=1',
    recipients:["jadhavsanyog.400@gmail.com"],
    //now send this mail automatically
    isHtml: false,
  })

 // Linking.openURL('mailto:jadhavsanyog.400@gmail.com');
}

    return (

      <ScrollView >
    <View>

      <View style={{backgroundColor:Colors.WHITE, paddingTop:80,paddingBottom:40, alignItems:'center',borderRadius:50, marginBottom:20,marginTop:-50}}>
        <Text style={{fontSize:20, fontWeight:'bold'}}>Proceed to Schedule Meet ⌛</Text>
      </View>
      
      <Text style={{   fontFamily:'outfit-bold', fontSize:24,marginLeft:20,marginRight:5,color:Colors.BLACK}}>How to Schedule Meet? ⏲️</Text>

      <View style={{alignItems:'center',backgroundColor:Colors.WHITE,marginBottom:20,marginHorizontal:20,marginTop:20,paddingTop:10,borderRadius:20}}>
          <Text style={{fontFamily:'outfit-semibold',marginBottom:10}}>
            👉🏻 Step 1: Click on the button below to send a request for G-Meet link.
          </Text>

          <TouchableOpacity onPress={()=>openEmail()}>
    <View style={{display:'flex',flexDirection:'row',backgroundColor:Colors.WHITE,padding:10,borderRadius:20,borderColor:Colors.BLACK,borderWidth:1 ,marginBottom:10}} >

      <Text style={{marginTop:10,fontSize:20}}>Send Meet Request </Text>
            <Image source={require('../../assets/images/sendemail.png')} style={{width:50, height: 50}}/>
      </View>
    </TouchableOpacity>

          <Text  style={{fontFamily:'outfit-semibold',marginBottom:10}}>
          👉🏻 Step 2: Click on Send Button to send the request.
          </Text>

          <Image source={require('../../assets/images/step1.jpg')} style={{width:250, height: 380,marginBottom:10}}/>
         
          <Text  style={{fontFamily:'outfit-semibold',marginBottom:10}}>
          👉🏻 Step 3: You will receive the G-Meet link on your registered email.
          </Text>
          
          <Text  style={{fontFamily:'outfit-semibold',marginBottom:10}}>
          👉🏻 Step 4: Click on Yes to confirm the meeting and to get timely Notifications. 
          </Text>
         
          <Image source={require('../../assets/images/step2.jpg')} style={{width:250, height: 440,marginBottom:10}}/>
         
          <Text style={{fontFamily:'outfit-semibold',marginBottom:10}}>
          👉🏻 Step 5: Click on 'Join Meeting' from Notifications.
          </Text>
          <Image source={require('../../assets/images/step3.jpg')} style={{width:300, height: 300,marginBottom:20}}/>
        </View>
      


      <View style={{alignItems:'center',marginBottom:20}}>
    <TouchableOpacity onPress={()=>openEmail()}>
    <View style={{display:'flex',flexDirection:'row',backgroundColor:Colors.WHITE,padding:10,borderRadius:20}} >

      <Text style={{marginTop:10,fontSize:20}}>Send Meet Request </Text>
            <Image source={require('../../assets/images/sendemail.png')} style={{width:50, height: 50}}/>
      </View>
    </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
    )
  }