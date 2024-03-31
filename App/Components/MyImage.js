import React from 'react';
import { Image, View } from 'react-native';
import Ai from '../../assets/images/Ai.jpg';
import { StyleSheet } from 'react-native';

export default function MyImage() {
  return (
    <View style={styles.container}>
      <Image
        source={{Ai}}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    shadowColor: '#ccc', // Shadow color
    shadowOffset: { width: 5, height: 5 }, // Offset (x, y)
    shadowOpacity: 0.5, // Opacity (0-1)
    shadowRadius: 10, // Radius (blur)
  }
});

