import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES, IMAGES } from '../../constants';

const Resources = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = [
    'All',
    'Documents',
    'Videos',
    'Assignments',
    'Quizzes',
    'Notes'
  ];
  
  // Mock data for resources
  const [resources, setResources] = useState([
    {
      id: '1',
      title: 'Introduction to Algebra',
      type: 'Document',
      format: 'PDF',
      subject: 'Mathematics',
      size: '2.3 MB',
      date: '18 Mar, 2024',
      downloads: 45,
      thumbnail: IMAGES.pdf,
    },
    {
      id: '2',
      title: 'Understanding Chemical Reactions',
      type: 'Video',
      format: 'MP4',
      subject: 'Chemistry',
      size: '56 MB',
      date: '15 Mar, 2024',
      downloads: 32,
      thumbnail: IMAGES.video,
    },
    {
      id: '3',
      title: 'Physics Formula Sheet',
      type: 'Document',
      format: 'PDF',
      subject: 'Physics',
      size: '1.8 MB',
      date: '10 Mar, 2024',
      downloads: 78,
      thumbnail: IMAGES.pdf,
    },
    {
      id: '4',
      title: 'Cell Biology Notes',
      type: 'Notes',
      format: 'DOCX',
      subject: 'Biology',
      size: '3.4 MB',
      date: '08 Mar, 2024',
      downloads: 23,
      thumbnail: IMAGES.doc,
    },
    {
      id: '5',
      title: 'Weekly Math Quiz',
      type: 'Quiz',
      format: 'QUIZ',
      subject: 'Mathematics',
      size: '0.5 MB',
      date: '05 Mar, 2024',
      downloads: 56,
      thumbnail: IMAGES.quiz,
    },
    {
      id: '6',
      title: 'English Grammar Practice',
      type: 'Assignment',
      format: 'PDF',
      subject: 'English',
      size: '1.2 MB',
      date: '02 Mar, 2024',
      downloads: 34,
      thumbnail: IMAGES.pdf,
    },
  ]);
  
  // Filter resources based on search query and selected category
  const filteredResources = resources.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'All' || 
                            item.type === activeCategory.slice(0, -1); // Remove 's' from category name
    
    return matchesSearch && matchesCategory;
  });

  const renderCategoryItem = (category: string) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        activeCategory === category && styles.activeCategoryButton,
      ]}
      onPress={() => setActiveCategory(category)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          activeCategory === category && styles.activeCategoryButtonText,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderResourceItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.resourceCard}
      onPress={() => navigation.navigate('ResourceDetails', { resourceId: item.id })}
    >
      <Image source={item.thumbnail} style={styles.resourceThumbnail} />
      <View style={styles.resourceInfo}>
        <Text style={styles.resourceTitle}>{item.title}</Text>
        <Text style={styles.resourceSubject}>{item.subject}</Text>
        <View style={styles.resourceStats}>
          <Text style={styles.resourceDate}>{item.date}</Text>
          <View style={styles.resourceDownloads}>
            <Ionicons name="download-outline" size={14} color={COLORS.gray} />
            <Text style={styles.resourceDownloadsText}>{item.downloads}</Text>
          </View>
        </View>
      </View>
      <View style={styles.resourceFormat}>
        <Text style={styles.resourceFormatText}>{item.format}</Text>
        <Text style={styles.resourceSize}>{item.size}</Text>
      </View>
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
        <Text style={styles.headerTitle}>Resources</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('UploadResource')}
        >
          <Ionicons name="add" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={COLORS.gray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search resources..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={COLORS.gray}
        />
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={({ item }) => renderCategoryItem(item)}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <FlatList
        data={filteredResources}
        renderItem={renderResourceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.resourcesList}
        showsVerticalScrollIndicator={false}
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  backButton: {
    padding: SIZES.padding,
  },
  addButton: {
    padding: SIZES.padding,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchIcon: {
    marginRight: SIZES.padding,
  },
  searchInput: {
    flex: 1,
    ...FONTS.body3,
    color: COLORS.text,
  },
  categoriesContainer: {
    marginVertical: SIZES.padding,
  },
  categoriesList: {
    paddingHorizontal: SIZES.padding * 2,
  },
  categoryButton: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 1.5,
    borderRadius: SIZES.radius * 2,
    marginRight: SIZES.padding,
    backgroundColor: COLORS.lightGray2,
  },
  activeCategoryButton: {
    backgroundColor: COLORS.primary,
  },
  categoryButtonText: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  activeCategoryButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  resourcesList: {
    padding: SIZES.padding * 2,
  },
  resourceCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  resourceThumbnail: {
    width: 50,
    height: 50,
    marginRight: SIZES.padding,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  resourceSubject: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginTop: 2,
  },
  resourceStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  resourceDate: {
    ...FONTS.body5,
    color: COLORS.lightGray,
    marginRight: SIZES.padding,
  },
  resourceDownloads: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceDownloadsText: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginLeft: 2,
  },
  resourceFormat: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: SIZES.padding,
  },
  resourceFormatText: {
    ...FONTS.body4,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  resourceSize: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginTop: 2,
  },
});

export default Resources; 