import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getCourseList } from "../../Services";
import SubHeading from "../SubHeading";
import Colors from "../../utils/Colors";
import { FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LeaderBoard from "../../Screens/LeaderBoard";
export default function CourseList() {
  const [courseList, setCourseList] = useState([]);
  const navigation=useNavigation();
  useEffect(() => {
    getCourses();
  }, []);



  const getCourses = () => {
    getCourseList().then((resp) => {
      console.log("RESP", resp);
      setCourseList(resp?.courses);
    });
  };
  return (
    <View>
      <SubHeading text={"Guidance By Professionals"} />

      <FlatList
        data={courseList}
        key={courseList.id}
        horizontal={true}
        renderItem={({ item }) => (


<TouchableOpacity onPress={()=>{navigation.navigate('Course-detail',{course:item})}} >
          <View
            style={{
              padding: 10,
              backgroundColor: Colors.WHITE,
              marginRight: 15,
              borderRadius: 15,
            }}
          >
            <Image
              source={{ uri: item?.banner?.url }}
              style={{ width: 210, height: 120, borderRadius: 15 }}
            />

            <View style={{ padding: 7 }}>
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  fontSize: 17,
                }}
              >
                {item.name}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    marginTop: 5,
                  }}
                >
                  <Ionicons name="person-sharp" size={18} color="black" />
                  <Text    style={{
                  fontFamily: "outfit-medium"}}>{item?.instructor}</Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    marginTop: 5,
                  }}
                >
                  <MaterialCommunityIcons
                    name="clock-time-eight-outline"
                    size={24}
                    color="black"
                  />
                  <Text    style={{
                  fontFamily: "outfit-medium"}}>{item?.time}</Text>
                </View>
              </View>
            </View>



            <View style={{
                    display: "flex",
                    flexDirection: "row"
                    , 
                    alignItems: "center",
                    gap: 5,
                    marginLeft:10,
                    marginTop: 5,}}>
            < FontAwesome name="rupee" size={18} color="#62a228" />
                <Text  style={{marginTop:1,
            color:Colors.GREEN,
            fontFamily:'outfit-medium'}}>{item.price}</Text>
                </View>
          
          </View>
        </TouchableOpacity>)}
      />
    </View>
  );
}
