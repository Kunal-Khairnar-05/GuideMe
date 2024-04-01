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
import { TextInput } from "react-native-gesture-handler";
import Header from "./Header";

export default function CourseList() {
  const [courseList, setCourseList] = useState([]);
  const [filteredCourseList, setFilteredCourseList] = useState([]); // State for filtered courses
  const navigation = useNavigation();

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    getCourseList().then((resp) => {
      console.log("RESP", resp);
      setCourseList(resp?.courses);
      setFilteredCourseList(resp?.courses); // Initialize filtered list with full data
    });
  };

  const handleSearch = (text) => {
    const filteredData = courseList.filter((course) => {
      const searchText = text.toLowerCase(); // Make search case-insensitive
      return (
        course.name.toLowerCase().includes(searchText) || // Search course name
        course.instructor?.toLowerCase().includes(searchText) // Search instructor name (if available)
      );
    });
    setFilteredCourseList(filteredData);
  };

  return (
    <View>

      <View style={{ backgroundColor: Colors.WHITE, paddingLeft: 20, paddingRight: 5, borderRadius: 99, marginTop: -75, marginHorizontal:10, marginBottom:15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput placeholder='Search Career Paths ' style={{ fontFamily: 'outfit', fontSize: 18 }} autoCapitalize='none' autoCorrect={false} onChangeText={handleSearch} />
        <TouchableOpacity>
          <Ionicons name="search-circle-sharp" size={50} color={Colors.PRIMARY} />
        </TouchableOpacity>
      </View>
     
      <SubHeading text={"Guidance By Professionals"} />

      <FlatList
        data={filteredCourseList} // Use filteredCourseList for data
        keyExtractor={(item) => item.id}
        horizontal={true}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Course-detail', { course: item })}>
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
                <Text style={{ fontFamily: "outfit-medium", fontSize: 17 }}>
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
                    <Text style={{ fontFamily: "outfit-medium" }}>{item?.instructor}</Text>
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
                    <MaterialCommunityIcons name="clock-time-eight-outline" size={24} color="black" />
                    <Text style={{ fontFamily: "outfit-medium" }}>{item?.time}</Text>
                  </View>
                </View>
              </View>

              <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5, marginLeft: 10, marginTop: 5 }}>
                <FontAwesome name="rupee" size={18} color="#62a228" />
                <Text style={{ marginTop: 1, color: Colors.GREEN, fontFamily: 'outfit-medium' }}>{item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );

}