import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageItem = ({ message }) => {
  const isSentByUser = message.sentBy === 'ME';

  return (
    <View style={[styles.messageContainer, isSentByUser && styles.sentByUser]}>
      <Text style={styles.messageText}>{message.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  sentByUser: {
    backgroundColor: '#ddd',
  },
  messageText: {
    fontSize: 16,
    },
});


