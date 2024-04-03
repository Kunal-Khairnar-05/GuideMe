import { View, Text, ScrollView} from 'react-native';
import Colors from '../utils/Colors';
import React from 'react';
import Header from '../Components/HomeScreen/Header';
import TypeWriter from '@sucho/react-native-typewriter';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { TextInput, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


export default function GuideScreen() {

    const [courseName, setCourseName] = useState('');
const [instructorName, setInstructorName] = useState('');
const [courseDetails, setCourseDetails] = useState('');
const [salary, setSalary] = useState('');
const [timeDuration, setTimeDuration] = useState('');
const [fees, setFees] = useState('');
const [bannerImage, setBannerImage] = useState(null); // State for image URI

    const CREATE_COURSE_MUTATION = `
    mutation MyMutation($price: String = "${fees}", $name: String="${courseName}", $time: String="${timeDuration}") { 
        createCourse(
          data: {instructor: Kunal, price: $price, name: $name, time:$time}
        ) {
          id
          name
          instructor
          price
          tags
          time
        }
      }
      `;



const styles = StyleSheet.create({
  typeWriterText: {
    fontSize:24,fontFamily:'outfit-bold',color:"#90c8ff",marginLeft:20,marginRight:5
  },
  typeWriterCursorText: {
    color: Colors.YELLOW,
    fontSize: 24,
  },
})

const styles1 = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: Colors.WHITE,
        margin: 10,
      borderRadius: 10,
    },
    fieldLabel: {
      fontSize: 16,
      marginBottom: 5,
      color: '#333',
    },
    textInput: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      fontSize: 16,
    },
    submitButton: {
      marginTop: 15,
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
    },
    submitButtonText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
    },
    bannerImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginBottom: 10,
      },
  });



const pickImage = async () => {
    if (await hasCameraRollPermissions()) {
  // Request camera roll permission for image selection
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert('Sorry, we need camera roll permissions to choose an image.');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled && result.uri) { // Check if result.uri exists
    setBannerImage(result.uri);
    console.log('Image selected:', result.uri);
  } else {
    console.log('Image selection cancelled or user did not grant access');
  }
}
};
const hasCameraRollPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  };




  const uploadImage = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg', // Assuming image format (adjust based on your image type)
        name: 'course-banner.jpeg', // Optional filename
      });
  
      const response = await fetch('https://your-image-hosting-service.com/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      if (data.success) {
        return data.url; // Return the uploaded image URL
      } else {
        throw new Error('Error uploading image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading course image. Please try again.');
    }
  };
  
  const handleSubmit = async () => {
    const courseData = {
      name: courseName,
      price: parseFloat(fees),
      time: timeDuration,
      instructor: instructorName,
      description: {
        markdown: courseDetails,
      },
    };
  


if (bannerImage) {
    const imageUrl = await uploadImage(bannerImage); // Upload image if provided
    courseData.banner = { url: imageUrl };
  }



  const response = await fetch(
    'https://api-ap-south-1.hygraph.com/v2/cltvdsiy503kn07uxq8zqlsnn/master',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: CREATE_COURSE_MUTATION,
        variables: {
          data: courseData,
        },
      }),
    }
  );

  const data = await response.json();
  console.log('Course created:', data.data.createCourse);

  console.log('Course created:', data.createCourse);
  alert('Course Submitted!');
    console.log('Course details:', {
      courseName,
      instructorName,
      courseDetails,
      salary,
      timeDuration,
      fees,
      bannerImage,
    });
    alert('Form Submitted!');

  };

  return (
      <View>
        <ScrollView>
      
            <View style={{padding:10,width:'100%',backgroundColor:Colors.PRIMARY,height:150}}>
            <Header/>

<View style={{height:350,paddingTop:25}}>
            <TypeWriter
        textArray={["You've Logged in as a GUIDE"]}
        loop={false}
        speed={100}
        delay={300}
        textStyle={styles.typeWriterText}
        cursorStyle={styles.typeWriterCursorText}
      />
      </View>
            </View>

    
    <View style={{marginTop:10}}>


    <Text style={{   fontFamily:'outfit-bold',
        fontSize:24,
        marginLeft:20,  
        marginRight:5,
        color:Colors.BLACK}}>Add new Course</Text>
        </View>

        <View style={styles1.container}>
      <Text style={styles1.fieldLabel}>Course Name:</Text>
      <TextInput
        value={courseName}
        onChangeText={setCourseName}
        placeholder="Enter Course Name"
        style={styles1.textInput}
      />
      <Text style={styles1.fieldLabel}>Instructor Name:</Text>
      <TextInput
        value={instructorName}
        onChangeText={setInstructorName}
        placeholder="Enter Instructor Name"
        style={styles1.textInput}
      />
      <Text style={styles1.fieldLabel}>Course Details:</Text>
      <TextInput
        value={courseDetails}
        onChangeText={setCourseDetails}
        placeholder="Enter Course Details"
        multiline={true}
        style={styles1.textInput}
      />
      <Text style={styles1.fieldLabel}>Salary (Optional):</Text>
      <TextInput
        value={salary}
        onChangeText={setSalary}
        placeholder="Enter Instructor Salary (Optional)"
        keyboardType="numeric"
        style={styles1.textInput}
      />
      <Text style={styles1.fieldLabel}>Time Duration:</Text>
      <TextInput
        value={timeDuration}
        onChangeText={setTimeDuration}
        placeholder="Enter Time Duration (e.g., Weeks, Months)"
        style={styles1.textInput}
      />
      <Text style={styles1.fieldLabel}>Fees:</Text>
      <TextInput
        value={fees}
        onChangeText={setFees}
        placeholder="Enter Course Fees"
        keyboardType="numeric"
        style={styles1.textInput}
      />
         <Text style={styles1.fieldLabel}>Course Banner:</Text>
         <View style={{margin:10}}>
    <Button title="Choose Image 📸"color={Colors.YELLOW} onPress={pickImage}/>
    </View>
      <Button title="Submit" onPress={handleSubmit} style={styles1.submitButton} />
    </View>

      </ScrollView>
    </View>
  )
}