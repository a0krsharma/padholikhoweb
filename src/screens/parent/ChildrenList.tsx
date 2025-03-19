import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants';
import { AuthService } from '../../services/auth';
import firestore from '@react-native-firebase/firestore';

interface ChildProfile {
  id: string;
  name: string;
  age: number;
  grade: string;
  school: string;
  photoURL?: string;
}

const ChildrenList = ({ navigation }: any) => {
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChildren = async () => {
    try {
      const userId = AuthService.getCurrentUser()?.uid;
      if (!userId) return;
      
      const snapshot = await firestore()
        .collection('users')
        .doc(userId)
        .collection('children')
        .get();
      
      const childrenData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as ChildProfile[];
      
      setChildren(childrenData);
    } catch (error) {
      console.error('Error fetching children:', error);
      Alert.alert('Error', 'Failed to load children profiles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildren();
    
    // Set up a listener for when we come back to this screen
    const unsubscribe = navigation.addListener('focus', () => {
      fetchChildren();
    });
    
    return unsubscribe;
  }, [navigation]);

  const handleAddChild = () => {
    navigation.navigate('AddEditChild', { mode: 'add' });
  };

  const handleEditChild = (child: ChildProfile) => {
    navigation.navigate('AddEditChild', { mode: 'edit', childData: child });
  };

  const handleViewChild = (child: ChildProfile) => {
    navigation.navigate('ChildDetail', { childId: child.id });
  };

  const renderChildItem = ({ item }: { item: ChildProfile }) => (
    <TouchableOpacity 
      style={styles.childCard}
      onPress={() => handleViewChild(item)}
    >
      <View style={styles.childInfo}>
        <View style={styles.avatarContainer}>
          {item.photoURL ? (
            <Image 
              source={{ uri: item.photoURL }} 
              style={styles.avatar} 
            />
          ) : (
            <View style={[styles.avatar, styles.placeholderAvatar]}>
              <Text style={styles.avatarText}>
                {item.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.childDetails}>
          <Text style={styles.childName}>{item.name}</Text>
          <Text style={styles.childMeta}>Age: {item.age} | Grade: {item.grade}</Text>
          <Text style={styles.childSchool}>{item.school}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleEditChild(item)}
        >
          <Ionicons name="create-outline" size={22} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('ProgressReports', { childId: item.id })}
        >
          <Ionicons name="stats-chart" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="people-outline" size={80} color={COLORS.lightGray} />
      <Text style={styles.emptyTitle}>No Children Added</Text>
      <Text style={styles.emptyText}>
        Add your children to monitor their academic progress and stay updated with their learning journey.
      </Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddChild}
      >
        <Text style={styles.addButtonText}>Add Child</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Children</Text>
        {children.length > 0 && (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleAddChild}
          >
            <Ionicons name="add" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={children}
          renderItem={renderChildItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={EmptyListComponent}
        />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: SIZES.padding * 2,
    paddingBottom: SIZES.padding * 4,
  },
  childCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  childInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    marginRight: SIZES.padding,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  placeholderAvatar: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...FONTS.h2,
    color: COLORS.white,
  },
  childDetails: {
    flex: 1,
  },
  childName: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: 4,
  },
  childMeta: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: 2,
  },
  childSchool: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.padding * 4,
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
    marginBottom: SIZES.padding * 2,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderRadius: SIZES.radius,
  },
  addButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default ChildrenList; 