import React, { useState, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';
import Colors from '../utils/Colors';
const FadeInOutText = () => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity is 0 (invisible)

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1, // Fade in
          duration: 1000, // Fade in duration (1 second)
          useNativeDriver: true, // Use native driver for smoother performance (optional)
        }),
        Animated.timing(fadeAnim, {
          toValue: 0, // Fade out
          duration: 1000, // Fade out duration (1 second)
          useNativeDriver: true, // Use native driver for smoother performance (optional)
        }),
      ])
    );

    animation.start(); // Start the animation loop

    // Cleanup function to stop the animation on unmount
    return () => animation.stop();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <View>
      <Animated.Text style={{ opacity: fadeAnim ,color:Colors.PRIMARY,fontFamily:'outfit-bold',fontSize:20}}>Free</Animated.Text>
    </View>
  );
};

export default FadeInOutText;
