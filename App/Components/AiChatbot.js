import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Colors from "../utils/Colors";
import { useAppContext } from "../../AppContext";
// import { text } from 'express';
import { Feather } from '@expo/vector-icons';
import { Image } from 'react-native';

const AIChatScreen = ({ navigation }) => {
  const API_KEY = "AIzaSyCPcJP36fwFW-gudrz4B8gDgaA57qF11p0";
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [extraActivity, setExtraActivity] = useState("");
  const [inputText, setInputText] = useState("");
  const { setMyTasks } = useAppContext();
  const [send, setSend] = useState(false);

  const extractJSONOutput = (responseText) => {
    // Find the index where the JSON object starts
    const jsonStartIndex = responseText.indexOf("{");

    if (jsonStartIndex === -1) {
      console.error("JSON object not found in response:", responseText);
      return null;
    }

    const jsonEndIndex = responseText.lastIndexOf("}");
    if (jsonEndIndex === -1) {
      console.error("JSON object not found in response:", responseText);
      return null;
    }

    // Extract the JSON substring
    const jsonSubstring = responseText.substring(
      jsonStartIndex - 1,
      jsonEndIndex + 1
    );

    try {
      // Parse the JSON substring
      const jsonObject = JSON.parse(jsonSubstring);
      return jsonObject;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  };

  const navigateToAnotherScreen = (jsonObject) => {
    // Navigate to the target screen and pass the JSON object as a route parameter
    navigation.navigate("MyTasks", { jsonData: jsonObject });
  };

  // useEffect(() => {
  //   const initialMessage = `${username}\n${education}\n${skills}\n${extraActivity}`;
  //   setMessages([{ text: initialMessage, sentBy: 'user' }]);
  //   callAPI(initialMessage);
  // }, []);

  const callAPI = async (question) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Your task is to perform the following actions: \n1 - Understand the Education, skills and extra curricular activities of user \n <> .\n2 - Understand the fact that user is from India and consider indian education system.\n3 - Describe about most prominent career path for user.\n4 - Output a json object that contains the \n following keys: CareerTitle, Tasks.\n\nUse the following format:\nTitle: <text to summarize>\nSummary: <summary>\nCareer Paths: <list of names in summary>\nOutput JSON: <json with keys careerTitle,Tasks >\n\n Text: ${question}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
            stopSequences: [],
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }
      );
      const responseData = response.data;
      const generatedText = responseData.candidates[0].content.parts[0].text;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: generatedText, sentBy: "bot" },
      ]);

      // Extract JSON object from response

      const jsonObject = extractJSONOutput(generatedText);

      if (jsonObject) {
        console.log("Extracted JSON:", jsonObject);
        // Navigate to another screen and pass JSON object as parameter
        navigation.navigate("MyTasks", { jsonData: jsonObject });
        navigateToAnotherScreen(jsonObject);
      } else {
        console.error("Failed to extract JSON from response:", generatedText);
      }
    } catch (error) {
      setError("Error calling API: " + error.message);
      console.error("Error calling API:", error);
    }
    setLoading(false);
    setSend(false);
  };

  const renderItem = ({ item }) => (
    <View
      style={{ alignItems: item.sentBy === "user" ? "flex-end" : "flex-start" }}
    >
      <View
        style={{
          backgroundColor:
            item.sentBy === "user" ? Colors.LIGHT_PRIMARY : "#009688",
          padding: 10,
          margin: 5,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: item.sentBy === "user" ? "black" : "white" }}>
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Loading image */}
      {loading && (
        <Image
          source={require("../../assets/images/img1.jpeg")}
          style={{width:250,height:250,borderRadius:99,marginLeft:30}}
        />
      )}


      <View style={{ flexDirection: "row", marginTop: 16 }}>
        <TextInput
          style={{ backgroundColor: Colors.WHITE, padding: 10, borderRadius: 5, marginHorizontal:10, borderColor:Colors.BLACK,borderWidth:1, marginBottom:8, maxWidth: 300, flex: 1, justifyContent: 'space-between'}}
          placeholder="Name, Education, Skills, Extra Activity"
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />

          <Feather name="send" size={30} style={{marginTop:10}} color="black" onPress={() => {
            const userMessage = inputText;
            // setMessages({inputText, sentBy: 'user'});
            callAPI(userMessage);
            // setMessages(prevMessages => [...prevMessages, { text: userMessage, sentBy: 'user' }]);
            setInputText("");
            setMyTasks(true);
            setSend(true);
          }}/>

      </View>

    </View>
  );
};

export default AIChatScreen;
