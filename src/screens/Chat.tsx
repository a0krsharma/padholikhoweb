import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants';

const Chat = ({ navigation, route }: any) => {
  const { teacher } = route.params;
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! How can I help you with your studies today?',
      sender: 'teacher',
      time: '10:00 AM',
    },
    {
      id: '2',
      text: 'I have some questions about the upcoming session.',
      sender: 'user',
      time: '10:05 AM',
    },
    {
      id: '3',
      text: 'Sure, what would you like to know?',
      sender: 'teacher',
      time: '10:06 AM',
    },
  ]);

  const sendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate response from teacher after a delay
    setTimeout(() => {
      const teacherResponse = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message. I'll get back to you shortly.",
        sender: 'teacher',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prevMessages => [...prevMessages, teacherResponse]);
    }, 1000);
  };

  const renderMessage = ({ item }: any) => {
    const isUser = item.sender === 'user';
    
    return (
      <View style={[
        styles.messageContainer,
        isUser ? styles.userMessage : styles.teacherMessage
      ]}>
        <Text style={[
          styles.messageText,
          isUser ? styles.userMessageText : styles.teacherMessageText
        ]}>{item.text}</Text>
        <Text style={[
          styles.messageTime,
          isUser ? styles.userMessageTime : styles.teacherMessageTime
        ]}>{item.time}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        
        <View style={styles.teacherInfo}>
          <View style={styles.teacherImagePlaceholder}>
            <Ionicons name="person" size={24} color={COLORS.white} />
          </View>
          <View>
            <Text style={styles.teacherName}>{teacher.name}</Text>
            <Text style={styles.teacherSubject}>{teacher.subject}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.videoCallButton}>
          <Ionicons name="videocam" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesContainer}
        inverted={false}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="attach" size={24} color={COLORS.gray} />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={COLORS.placeholder}
            value={message}
            onChangeText={setMessage}
            multiline
          />
          
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={sendMessage}
            disabled={message.trim() === ''}
          >
            <Ionicons 
              name="send" 
              size={24} 
              color={message.trim() === '' ? COLORS.gray : COLORS.primary} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    marginRight: SIZES.padding,
  },
  teacherInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  teacherImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  teacherName: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  teacherSubject: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  videoCallButton: {
    padding: SIZES.padding / 2,
  },
  messagesContainer: {
    padding: SIZES.padding * 2,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
  },
  teacherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.input,
  },
  messageText: {
    ...FONTS.body3,
  },
  userMessageText: {
    color: COLORS.white,
  },
  teacherMessageText: {
    color: COLORS.text,
  },
  messageTime: {
    ...FONTS.body5,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  userMessageTime: {
    color: COLORS.white,
  },
  teacherMessageTime: {
    color: COLORS.gray,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.input,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    maxHeight: 100,
    ...FONTS.body3,
    color: COLORS.text,
  },
  attachButton: {
    marginRight: SIZES.padding,
  },
  sendButton: {
    marginLeft: SIZES.padding,
  },
});

export default Chat; 