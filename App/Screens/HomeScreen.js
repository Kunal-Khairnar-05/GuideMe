import React from 'react'
import { View, Text ,Image,TouchableOpacity} from 'react-native'
import Header from '../Components/HomeScreen/Header'
import Colors from '../utils/Colors'
import Ai from '../../assets/images/Ai.jpg'
import { MaterialIcons } from '@expo/vector-icons';
import CourseList from '../Components/HomeScreen/CourseList'
import FadeInOutText from '../Components/FadeInOutText'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import QuizScreen from '../Components/Quiz'
export default function HomeScreen() {
  const navigation=useNavigation();
  
  const formatRequest = (question) => {
    const requestTemplate = `
    {
      "contents": [
        {
          "parts": [
            {
              "text": "%s"
            }
          ]
        }
      ],
      "generationConfig": {
        "temperature": 0.9,
        "topK": 1,
        "topP": 1,
        "maxOutputTokens": 2048,
        "stopSequences": []
      },
      "safetySettings": [
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    }`;
  
    const promptTemplate = `
    Your task is to perform the following actions: 
    1 - Greet User with username ${question.split('\n')[0]}
    2 - Understand the Education, skills and extra curricular activities of user 
     <> .
    3 - Understand the fact that user is from India and consider indian education system.
    4- Output a json object that contains the following keys: careerTitle, tasks.
    
    Use the following format:
    Title: <Title of career>
    Output JSON: <json with keys careerTitle,tasks >
    Text:<%s>`;
  
    const finalPrompt = promptTemplate.replace('%s', question);
    const requestJson = requestTemplate.replace('%s', finalPrompt);
  
    return JSON.parse(requestJson); // Parse the formatted string into a JSON object
  };
  
  return (
    <ScrollView>
    <View>
    <View style={{backgroundColor:Colors.PRIMARY,height:250,padding:20}}>

    <Header/>


    </View>
    


 <View style={{marginTop:-70}}>
   <CourseList/>
   </View>

    



    <View style={{marginTop:10}}>
<View style={{ display: "flex",
                    flexDirection: "row",
                    marginTop:30}}>
<Text style={{   fontFamily:'outfit-bold',
        fontSize:24,
        marginLeft:20,
        marginRight:5,
        color:Colors.BLACK}}>Introducing AI Guide ✨</Text>


<View style={{marginLeft:15,
marginTop:2,
}}>
<FadeInOutText/>

</View>
</View>
    <TouchableOpacity
        onPress={() => {{navigation.navigate('Chat')}}}
        style={{display:'flex',
        marginTop:10,

        flexDirection:'row',
        alignItems:'center',gap:10,justifyContent:'center',
        padding:5,
        borderRadius:99
    }}> 

             <Image source={Ai}
             style={{
                width:300, height: 130,
                borderRadius:40, 
                shadowColor: '#ccc', // Shadow color
                shadowOffset: { width: 5, height: 5 }, // Offset (x, y)
                shadowOpacity: 0.5, // Opacity (0-1)
                shadowRadius: 10, // Radius (blur)
             }}/>

           
        </TouchableOpacity>
    </View>


    <Text style={{   fontFamily:'outfit-bold',
        fontSize:24,
        marginLeft:20,
        marginRight:5,
        marginTop:20,
        marginBottom:20,
        color:Colors.BLACK}}>Test Your Knowledge 🧠</Text>

    <View style={{alignItems:'center',marginBottom:20}}>
    <View style={{alignItems:'center',backgroundColor:Colors.WHITE, borderRadius:40,width:250}}>
          <TouchableOpacity onPress={()=>navigation.navigate('Quiz')}>
            <Image source={require('../../assets/images/Quiz3.png')} style={{width:300, height: 230}}/>
          </TouchableOpacity>
      </View>
    </View>
   
    </View>
    </ScrollView>
     
  )
}


