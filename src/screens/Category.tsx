import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  FlatList
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONTS, SIZES } from '../constants';

const Category = ({ navigation, route }: any) => {
  const { category } = route.params;

  const teachers = [
    { id: 1, name: 'Sarah Johnson', subject: category.name, rating: 4.8 },
    { id: 2, name: 'Michael Chen', subject: category.name, rating: 4.9 },
    { id: 3, name: 'Emma Wilson', subject: category.name, rating: 4.7 },
    { id: 4, name: 'David Kim', subject: category.name, rating: 4.6 },
    { id: 5, name: 'Lisa Patel', subject: category.name, rating: 4.5 },
  ];

  const renderTeacherItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.teacherCard}
      onPress={() => navigation.navigate('TeacherProfile', { teacher: item })}
    >
      <View style={styles.teacherImagePlaceholder}>
        <Ionicons name="person" size={40} color={COLORS.white} />
      </View>
      <View style={styles.teacherInfo}>
        <Text style={styles.teacherName}>{item.name}</Text>
        <Text style={styles.teacherSubject}>{item.subject}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color={COLORS.yellow} />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color={COLORS.gray} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category.name}</Text>
      </View>

      <View style={styles.categoryHeader}>
        <View style={styles.iconContainer}>
          <MaterialIcons name={category.icon} size={50} color={COLORS.primary} />
        </View>
        <Text style={styles.categoryTitle}>{category.name}</Text>
        <Text style={styles.categoryDescription}>
          Find the best {category.name} teachers to help you excel in your studies.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Available Teachers</Text>
        <FlatList
          data={teachers}
          renderItem={renderTeacherItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.teachersList}
        />
      </View>
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
  headerTitle: {
    ...FONTS.h3,
    color: COLORS.text,
  },
  categoryHeader: {
    alignItems: 'center',
    padding: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  iconContainer: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.secondary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  categoryTitle: {
    ...FONTS.h2,
    color: COLORS.text,
    marginBottom: SIZES.padding / 2,
  },
  categoryDescription: {
    ...FONTS.body3,
    color: COLORS.gray,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: SIZES.padding * 2,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  teachersList: {
    paddingBottom: SIZES.padding * 2,
  },
  teacherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
    padding: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  teacherImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  teacherInfo: {
    flex: 1,
  },
  teacherName: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: 4,
  },
  teacherSubject: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...FONTS.body4,
    color: COLORS.text,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});

export default Category; 