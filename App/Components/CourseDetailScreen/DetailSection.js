import { View, Text, Dimensions, Button } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '../../utils/Colors'
import { Image } from 'react-native'
import OptionItem from './OptionItem'
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import QuizScreen from '../Quiz'

// import OptionItem from './OptionItem'
export default function DetailSection({course}) {
  const navigation=useNavigation();
  // const chosenCareer = 'Software Engineer';
  return (
    
    <ScrollView>
    <View>
    <View style={{padding:10,borderRadius:15,backgroundColor:Colors.WHITE, marginBottom:15}}>
      <Image source={{uri:course?.banner?.url}} 
      style={{width:Dimensions.get('screen').width*0.88,height:190,borderRadius:15}}
      />
      <Text style={{fontSize:25, fontFamily:'outfit-medium',marginTop:10}}>{course.name}</Text>
     
     
      <OptionItem icon='person' value={course.instructor} size={22}/>
  
      <Text style={{fontSize:19, fontFamily:'outfit-medium',marginTop:10}}>Course Details</Text>
      <Text style={{fontSize:18, fontFamily:'outfit',marginTop:10}}>{course?.description?.markdown}</Text>

      {/* <QuizScreen career={chosenCareer}/> */}


      <TouchableOpacity onPress={()=>navigation.navigate('Stripe')}>

      <Button title='Enroll Now' color={Colors.PRIMARY}/>
      </TouchableOpacity>


    </View>
    </View>
    </ScrollView>
    
  )
}