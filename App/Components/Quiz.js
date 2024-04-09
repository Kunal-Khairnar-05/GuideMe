import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, ScrollView } from 'react-native';
import { HarmCategory, HarmBlockThreshold, GoogleGenerativeAI } from '@google/generative-ai';
import Colors from '../utils/Colors';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'react-native';
import Quiz5 from '../../assets/images/quiz5.png';
import Loading from '../../assets/images/loading1.png';

const QuizScreen = () => {
  const [topic, setTopic] = useState('');
  const [quizText, setQuizText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [inputText, setInputText] = useState();
  const [visible, setVisible] = useState(true);
  const handleGenerateQuiz = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI("AIzaSyCPcJP36fwFW-gudrz4B8gDgaA57qF11p0"); // Replace with your API key
      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

      const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

      const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
          {
            role: "user",
            parts: [
              {
                text: `Create a 10-question multiple-choice quiz about ${topic}:\n\n* Answer key at the end.`,
              },
            ],
          },
          {
            role: "model",
            parts: [{ text: "## Quiz for" }],
          },
        ],
      });

      const result = await chat.sendMessage(topic);
      const response = result.response;

      const generatedText = response.text();
      setQuizText(generatedText);

      // Parse quiz text directly within this function
      const questionLines = generatedText.split('\n').filter(line => line.startsWith('Q=')); // Adjust based on actual format (e.g., 'Q=')
      const parsedQuestions = questionLines.map((line, index) => {
        const options = generatedText.split('\n').slice(index * 5 + 2, index * 5 + 6);
        return { question: line.slice(2), options };


      });
      setQuestions(parsedQuestions);
    } catch (error) {
      console.error('Error generating quiz:', error);
      setError('Failed to generate quiz. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.questionItem}>
      
      <Text style={styles.questionText}>{`Question ${item.index + 1}: ${item.question}`}</Text>
      <FlatList
        data={item.options}
        renderItem={({ item }) => <Text style={styles.optionText}>{item}</Text>}
        keyExtractor={item => item}
      />
    </View>
  );

  return (
    <ScrollView>
       <View style={{backgroundColor:Colors.WHITE, paddingTop:80,paddingBottom:40, alignItems:'center',borderRadius:50, marginBottom:20,marginTop:-50}}>
        <Text style={{fontSize:25, fontWeight:'bold'}}>Lets Take A Quiz 💡</Text>
      </View>
    <View style={styles.container}>
    
    
    
    <View style={{backgroundColor:Colors.WHITE,paddingLeft:10,

paddingRight:8,
borderRadius:99,
marginTop:25,

display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

<TextInput placeholder='Enter Career to take Quiz ... 'onChangeText={setTopic} style={{fontFamily:'outfit',
fontSize:18, padding:10 ,maxWidth: 300, flex: 1, justifyContent: 'space-between'}}/>

<TouchableOpacity style={{paddingTop:10}}>
{/* <FontAwesome name="send" size={30} color="black" onPress={handleGenerateQuiz} disabled={isLoading}/> */}
{/* <Ionicons name="search-circle-sharp" size={50} color={Colors.PRIMARY} /> */}
<Ionicons name="send" size={25} color={Colors.PRIMARY} onPress={handleGenerateQuiz} disabled={isLoading}/>
</TouchableOpacity>


</View>


      {/* <TextInput
        style={styles.input}
        value={topic}
        placeholder='Enter Career to take Quiz ...'
        onChangeText={setTopic}
      /> */}

      {/* <Button title="Generate Quiz" onPress={handleGenerateQuiz} disabled={isLoading} /> */}


      {isLoading && <Text>Generating quiz..</Text> &&
       <Image source={Loading} style={{width:250,height:250,borderRadius:99,marginBottom:400,marginLeft:30}}/>
      }
     
       {visible && <Image source={Quiz5} style={{alignItems:'center' ,width:350,height:350,borderRadius:99}}/>}

      <View style={{backgroundColor:Colors.WHITE, marginTop:20,marginHorizontal:10 ,paddingHorizontal:5}}>
      {quizText && <Text>{quizText}</Text>}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}

      {quizText && questions.length > 0 && (
        <>
          <Text style={styles.quizTitle}>Quiz for {topic}</Text>
          
          <FlatList
            data={questions}
            renderItem={renderItem}
            keyExtractor={item => item.question}
          />
        </>
      )}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 16,
  },
  questionItem: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    marginBottom: 4,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
});

export default QuizScreen;

