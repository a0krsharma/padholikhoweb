import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants';
import { AuthService } from '../../services/auth';
import firestore from '@react-native-firebase/firestore';

interface MessageType {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Date;
  read: boolean;
  attachmentUrl?: string;
  attachmentType?: 'image' | 'document';
}

const Chat = ({ route, navigation }: any) => {
  const { conversationId, teacherName, teacherPhoto, childName } = route.params;
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [messageText, setMessageText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    fetchMessages();

    // Set up keyboard listeners
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        scrollToBottom();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    // Clean up listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [conversationId]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const userId = AuthService.getCurrentUser()?.uid;
      if (!userId) return;

      // In a real app, this would fetch messages from Firestore
      // For now, we'll simulate this with mock data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - representing a conversation between a parent and a teacher
      const teacherId = 'teacher1'; // This would be extracted from the conversationId
      const parentId = userId;
      
      const mockMessages: MessageType[] = [
        {
          id: '1',
          senderId: teacherId,
          senderName: teacherName,
          text: `Hello! I wanted to discuss ${childName}'s progress in math class.`,
          timestamp: new Date(2023, 5, 15, 9, 30),
          read: true,
        },
        {
          id: '2',
          senderId: parentId,
          senderName: 'You',
          text: `Hi ${teacherName}, thank you for reaching out. How is ${childName} doing?`,
          timestamp: new Date(2023, 5, 15, 9, 35),
          read: true,
        },
        {
          id: '3',
          senderId: teacherId,
          senderName: teacherName,
          text: `${childName} has been doing very well with algebra concepts, but is struggling a bit with geometry. I'd like to suggest some additional practice problems.`,
          timestamp: new Date(2023, 5, 15, 9, 40),
          read: true,
        },
        {
          id: '4',
          senderId: parentId,
          senderName: 'You',
          text: `That would be great! I've noticed ${childName} has been confused about some geometry homework recently.`,
          timestamp: new Date(2023, 5, 15, 9, 45),
          read: true,
        },
        {
          id: '5',
          senderId: teacherId,
          senderName: teacherName,
          text: `I've attached a worksheet with practice problems. We'll be covering these concepts in class next week, but early practice would be beneficial.`,
          timestamp: new Date(2023, 5, 15, 9, 50),
          read: true,
          attachmentUrl: 'https://example.com/geometry_worksheet.pdf',
          attachmentType: 'document',
        },
        {
          id: '6',
          senderId: parentId,
          senderName: 'You',
          text: `Thank you so much! We'll work on these problems over the weekend.`,
          timestamp: new Date(2023, 5, 15, 9, 55),
          read: true,
        },
        {
          id: '7',
          senderId: teacherId,
          senderName: teacherName,
          text: `Great! Also, here's a photo from yesterday's class project. ${childName} did an excellent job presenting.`,
          timestamp: new Date(2023, 5, 15, 10, 0),
          read: true,
          attachmentUrl: 'https://randomuser.me/api/portraits/lego/6.jpg',
          attachmentType: 'image',
        },
        {
          id: '8',
          senderId: teacherId,
          senderName: teacherName,
          text: `Do you have any questions about the upcoming field trip next month?`,
          timestamp: new Date(2023, 5, 15, 10, 5),
          read: false,
        },
      ];
      
      setMessages(mockMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
      // Scroll to the bottom after loading messages
      setTimeout(() => scrollToBottom(), 100);
    }
  };

  const scrollToBottom = () => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;
    
    const userId = AuthService.getCurrentUser()?.uid;
    if (!userId) return;
    
    setSending(true);
    
    // Create a new message object
    const newMessage: MessageType = {
      id: Date.now().toString(),
      senderId: userId,
      senderName: 'You',
      text: messageText.trim(),
      timestamp: new Date(),
      read: false,
    };
    
    // In a real app, this would save the message to Firestore
    // For now, we'll just add it to our local state
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessageText('');
    setSending(false);
    
    // Scroll to bottom after sending a message
    setTimeout(() => scrollToBottom(), 100);
  };

  const formatMessageTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatMessageDate = (timestamp: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    if (
      timestamp.getDate() === today.getDate() &&
      timestamp.getMonth() === today.getMonth() &&
      timestamp.getFullYear() === today.getFullYear()
    ) {
      return 'Today';
    } else if (
      timestamp.getDate() === yesterday.getDate() &&
      timestamp.getMonth() === yesterday.getMonth() &&
      timestamp.getFullYear() === yesterday.getFullYear()
    ) {
      return 'Yesterday';
    } else {
      return timestamp.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
    }
  };

  // Group messages by date
  const groupedMessages: { [date: string]: MessageType[] } = {};
  messages.forEach(message => {
    const dateString = formatMessageDate(message.timestamp);
    if (!groupedMessages[dateString]) {
      groupedMessages[dateString] = [];
    }
    groupedMessages[dateString].push(message);
  });

  // Convert grouped messages to a flat list with date headers
  const messagesWithDateHeaders: (MessageType | { isDateHeader: boolean, date: string })[] = [];
  Object.keys(groupedMessages).forEach(date => {
    messagesWithDateHeaders.push({ isDateHeader: true, date });
    groupedMessages[date].forEach(message => {
      messagesWithDateHeaders.push(message);
    });
  });

  const renderItem = ({ item }: { item: MessageType | { isDateHeader: boolean, date: string } }) => {
    // Render date header
    if ('isDateHeader' in item) {
      return (
        <View style={styles.dateHeaderContainer}>
          <Text style={styles.dateHeaderText}>{item.date}</Text>
        </View>
      );
    }
    
    // Render message
    const message = item as MessageType;
    const isUserMessage = message.senderId === AuthService.getCurrentUser()?.uid;
    
    return (
      <View style={[
        styles.messageContainer,
        isUserMessage ? styles.userMessageContainer : styles.otherMessageContainer
      ]}>
        {!isUserMessage && (
          <View style={styles.avatarContainer}>
            {teacherPhoto ? (
              <Image source={{ uri: teacherPhoto }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.placeholderAvatar]}>
                <Text style={styles.avatarText}>{teacherName.charAt(0)}</Text>
              </View>
            )}
          </View>
        )}
        
        <View style={[
          styles.messageBubble,
          isUserMessage ? styles.userMessageBubble : styles.otherMessageBubble
        ]}>
          {message.attachmentType === 'image' && message.attachmentUrl && (
            <Image 
              source={{ uri: message.attachmentUrl }} 
              style={styles.attachedImage}
              resizeMode="cover"
            />
          )}
          
          {message.attachmentType === 'document' && message.attachmentUrl && (
            <TouchableOpacity style={styles.documentContainer}>
              <Ionicons name="document-text" size={24} color={COLORS.primary} />
              <Text style={styles.documentText}>View Document</Text>
            </TouchableOpacity>
          )}
          
          <Text style={[
            styles.messageText,
            isUserMessage ? styles.userMessageText : styles.otherMessageText
          ]}>
            {message.text}
          </Text>
          
          <Text style={[
            styles.messageTime,
            isUserMessage ? styles.userMessageTime : styles.otherMessageTime
          ]}>
            {formatMessageTime(message.timestamp)}
            {isUserMessage && (
              <Text style={styles.readStatus}>
                {' '}{message.read ? 'Read' : 'Delivered'}
              </Text>
            )}
          </Text>
        </View>
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
        
        <View style={styles.headerInfo}>
          {teacherPhoto ? (
            <Image source={{ uri: teacherPhoto }} style={styles.headerAvatar} />
          ) : (
            <View style={[styles.headerAvatar, styles.placeholderAvatar]}>
              <Text style={styles.avatarText}>{teacherName.charAt(0)}</Text>
            </View>
          )}
          <View style={styles.headerText}>
            <Text style={styles.headerName}>{teacherName}</Text>
            {childName && (
              <Text style={styles.headerSubtitle}>{childName}'s Teacher</Text>
            )}
          </View>
        </View>
        
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="call" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messagesWithDateHeaders}
          keyExtractor={(item, index) => 
            'isDateHeader' in item ? `date-${item.date}` : item.id
          }
          renderItem={renderItem}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => scrollToBottom()}
        />
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.inputButton}>
            <Ionicons name="add-circle" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={messageText}
            onChangeText={setMessageText}
            multiline
            maxLength={500}
          />
          
          {messageText.trim() ? (
            <TouchableOpacity 
              style={[styles.sendButton, sending && styles.disabledButton]}
              onPress={handleSendMessage}
              disabled={sending}
            >
              {sending ? (
                <ActivityIndicator size="small" color={COLORS.white} />
              ) : (
                <Ionicons name="send" size={20} color={COLORS.white} />
              )}
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={styles.inputButton}>
                <Ionicons name="camera" size={24} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputButton}>
                <Ionicons name="mic" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SIZES.padding,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SIZES.padding,
  },
  headerText: {
    flex: 1,
  },
  headerName: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  headerSubtitle: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  headerButton: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesList: {
    padding: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
  },
  dateHeaderContainer: {
    alignItems: 'center',
    marginVertical: SIZES.padding,
  },
  dateHeaderText: {
    ...FONTS.body4,
    color: COLORS.gray,
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: SIZES.padding,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
  },
  avatarContainer: {
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  placeholderAvatar: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...FONTS.body4,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  messageBubble: {
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    maxWidth: '100%',
  },
  userMessageBubble: {
    backgroundColor: COLORS.primary,
  },
  otherMessageBubble: {
    backgroundColor: COLORS.white,
  },
  messageText: {
    ...FONTS.body3,
  },
  userMessageText: {
    color: COLORS.white,
  },
  otherMessageText: {
    color: COLORS.text,
  },
  messageTime: {
    ...FONTS.body5,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  userMessageTime: {
    color: 'rgba(255,255,255,0.7)',
  },
  otherMessageTime: {
    color: COLORS.gray,
  },
  readStatus: {
    ...FONTS.body5,
    color: 'rgba(255,255,255,0.7)',
  },
  attachedImage: {
    width: 200,
    height: 150,
    borderRadius: SIZES.radius / 2,
    marginBottom: SIZES.padding / 2,
  },
  documentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: SIZES.padding / 2,
    borderRadius: SIZES.radius / 2,
    marginBottom: SIZES.padding / 2,
  },
  documentText: {
    ...FONTS.body4,
    color: COLORS.primary,
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  inputButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    ...FONTS.body3,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default Chat; 