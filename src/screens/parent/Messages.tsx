import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants';
import { AuthService } from '../../services/auth';
import firestore from '@react-native-firebase/firestore';

interface MessageType {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

interface ConversationType {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTimestamp: Date;
  unreadCount: number;
  teacherId: string;
  teacherName: string;
  teacherPhoto?: string;
  childId?: string;
  childName?: string;
}

const Messages = ({ navigation }: any) => {
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchConversations();
    
    // Set up a listener for new messages
    const unsubscribe = navigation.addListener('focus', () => {
      fetchConversations();
    });
    
    return unsubscribe;
  }, [navigation]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const userId = AuthService.getCurrentUser()?.uid;
      if (!userId) return;

      // In a real app, this would fetch conversations from Firestore
      // For now, we'll simulate this with mock data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockConversations: ConversationType[] = [
        {
          id: 'conv1',
          participants: [userId, 'teacher1'],
          lastMessage: 'I've checked Rahul's homework and he's making great progress!',
          lastMessageTimestamp: new Date(2023, 5, 15, 14, 30),
          unreadCount: 3,
          teacherId: 'teacher1',
          teacherName: 'Amit Kumar',
          teacherPhoto: 'https://randomuser.me/api/portraits/men/32.jpg',
          childId: 'child1',
          childName: 'Rahul Sharma',
        },
        {
          id: 'conv2',
          participants: [userId, 'teacher2'],
          lastMessage: 'Can we schedule a meeting to discuss Anjali's science project?',
          lastMessageTimestamp: new Date(2023, 5, 14, 10, 15),
          unreadCount: 0,
          teacherId: 'teacher2',
          teacherName: 'Priya Singh',
          teacherPhoto: 'https://randomuser.me/api/portraits/women/44.jpg',
          childId: 'child2',
          childName: 'Anjali Sharma',
        },
        {
          id: 'conv3',
          participants: [userId, 'teacher3'],
          lastMessage: 'Rahul did very well in today's English test!',
          lastMessageTimestamp: new Date(2023, 5, 13, 16, 45),
          unreadCount: 0,
          teacherId: 'teacher3',
          teacherName: 'Rajesh Verma',
          childId: 'child1',
          childName: 'Rahul Sharma',
        },
        {
          id: 'conv4',
          participants: [userId, 'teacher4'],
          lastMessage: 'Please remind Anjali to bring her history book tomorrow.',
          lastMessageTimestamp: new Date(2023, 5, 10, 9, 30),
          unreadCount: 1,
          teacherId: 'teacher4',
          teacherName: 'Deepa Gupta',
          childId: 'child2',
          childName: 'Anjali Sharma',
        },
      ];
      
      setConversations(mockConversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      // Today, show time
      return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays === 1) {
      // Yesterday
      return 'Yesterday';
    } else if (diffInDays < 7) {
      // Within a week, show day name
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[timestamp.getDay()];
    } else {
      // More than a week, show date
      return timestamp.toLocaleDateString([], { day: 'numeric', month: 'short' });
    }
  };

  const filteredConversations = searchText.trim() 
    ? conversations.filter(conv => 
        conv.teacherName.toLowerCase().includes(searchText.toLowerCase()) ||
        (conv.childName && conv.childName.toLowerCase().includes(searchText.toLowerCase()))
      )
    : conversations;

  const renderConversationItem = ({ item }: { item: ConversationType }) => (
    <TouchableOpacity 
      style={styles.conversationItem}
      onPress={() => navigation.navigate('Chat', { 
        conversationId: item.id,
        teacherName: item.teacherName,
        teacherPhoto: item.teacherPhoto,
        childName: item.childName
      })}
    >
      <View style={styles.avatarContainer}>
        {item.teacherPhoto ? (
          <Image source={{ uri: item.teacherPhoto }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholderAvatar]}>
            <Text style={styles.avatarText}>
              {item.teacherName.charAt(0)}
            </Text>
          </View>
        )}
        {item.unreadCount > 0 && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.teacherName}>{item.teacherName}</Text>
          <Text style={styles.timestamp}>{formatTimestamp(item.lastMessageTimestamp)}</Text>
        </View>
        
        {item.childName && (
          <Text style={styles.childName}>
            {item.childName}'s Teacher
          </Text>
        )}
        
        <Text 
          style={[
            styles.lastMessage, 
            item.unreadCount > 0 && styles.unreadMessage
          ]}
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="create-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={COLORS.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search teachers or children..."
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.gray} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : filteredConversations.length > 0 ? (
        <FlatList
          data={filteredConversations}
          keyExtractor={(item) => item.id}
          renderItem={renderConversationItem}
          contentContainerStyle={styles.conversationList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="chatbubble-ellipses-outline" size={80} color={COLORS.lightGray} />
          <Text style={styles.emptyTitle}>
            {searchText.length > 0 ? 'No Results Found' : 'No Messages Yet'}
          </Text>
          <Text style={styles.emptyText}>
            {searchText.length > 0 
              ? `No conversations match "${searchText}"`
              : "You haven't started any conversations with teachers yet. Use the + button to start a new conversation."
            }
          </Text>
        </View>
      )}
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
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  headerButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    paddingVertical: 8,
  },
  searchInput: {
    ...FONTS.body3,
    flex: 1,
    marginLeft: 8,
    color: COLORS.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conversationList: {
    paddingVertical: SIZES.padding,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: SIZES.padding,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  placeholderAvatar: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  badgeText: {
    ...FONTS.body5,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  teacherName: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  timestamp: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  childName: {
    ...FONTS.body5,
    color: COLORS.primary,
    marginBottom: 4,
  },
  lastMessage: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  unreadMessage: {
    color: COLORS.text,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
  },
  emptyTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginTop: SIZES.padding * 2,
    marginBottom: SIZES.padding,
  },
  emptyText: {
    ...FONTS.body4,
    color: COLORS.gray,
    textAlign: 'center',
  },
});

export default Messages; 