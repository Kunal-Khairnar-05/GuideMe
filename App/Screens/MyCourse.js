import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../utils/Colors';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const MyTasks = ({ route }) => {
  const { jsonData } = route.params;

  const navigation = useNavigation();
  return (
    
    <View style={styles.container}>
      <View style={{backgroundColor:Colors.WHITE, padding:10, alignItems:'center',borderRadius:10, marginBottom:20}}>
        <Text style={styles.title}>🎓 Career - {jsonData.CareerTitle} </Text>
      </View>
      
      <Text style={styles.subtitle}>✅ Tasks:</Text>
      
      <View style={{backgroundColor:Colors.WHITE, padding:10, borderRadius:10, marginTop:20}}>
      <View style={styles.taskContainer}>
        {jsonData.Tasks.map((task, index) => (
          <Text key={index} style={styles.task}> 👉🏻 {task}</Text>
        ))}
      </View>
      </View>
      
      
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskContainer: {
    marginTop: 5,
  },
  task: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default MyTasks;
