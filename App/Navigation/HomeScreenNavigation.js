import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import CourseDetailScreen from '../Screens/CourseDetailScreen';
import Videocall from '../Components/Videocall';
import ChatScreen from '../Components/AiChatbot';
import DetailSection from '../Components/CourseDetailScreen/DetailSection';
import StripeApp from '../src/StripeApp';
import Quiz from '../Components/Quiz';
import { S } from '@expo/html-elements';
import GuideScreen from '../Screens/GuideScreen';



const Stack=createStackNavigator();
export default function HomeScreenNavigation() {
  return (
   <Stack.Navigator screenOptions={{headerShown:false}}>


<Stack.Screen name='Home' component={HomeScreen}/>
<Stack.Screen name='Course-detail' component={CourseDetailScreen}/>
<Stack.Screen name='Video-Call' component={Videocall}/>
<Stack.Screen name='Chat' component={ChatScreen}/>
<Stack.Screen name='Stripe' component={StripeApp}/>
<Stack.Screen name='Quiz' component={Quiz}/>
<Stack.Screen name='Guide' component={GuideScreen}/>
    </Stack.Navigator>
  )
}