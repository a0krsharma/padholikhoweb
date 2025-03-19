import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES, IMAGES } from '../../constants';

const Resources = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Resource categories
  const categories = [
    'All',
    'Notes',
    'Videos',
    'Books',
    'Practice Tests',
    'Study Guides',
    'Worksheets',
  ];
  
  // Mock data for resources
  const [resources, setResources] = useState([
    {
      id: '1',
      title: 'Mathematics Formula Sheet',
      description: 'Comprehensive collection of all mathematics formulas for class 10',
      subject: 'Mathematics',
      type: 'Notes',
      teacher: 'Dr. Priya Sharma',
      size: '2.3 MB',
      fileType: 'PDF',
      dateAdded: '15 Mar, 2024',
      downloads: 128,
      thumbnail: IMAGES.pdf,
    },
    {
      id: '2',
      title: 'Understanding Chemical Reactions',
      description: 'Video lecture explaining the core principles of chemical reactions',
      subject: 'Chemistry',
      type: 'Videos',
      teacher: 'Dr. Meena Gupta',
      size: '45 MB',
      fileType: 'MP4',
      dateAdded: '12 Mar, 2024',
      downloads: 89,
      thumbnail: IMAGES.video,
    },
    {
      id: '3',
      title: 'Physics Problem Set',
      description: 'Collection of practice problems for mechanics and waves',
      subject: 'Physics',
      type: 'Worksheets',
      teacher: 'Prof. Rahul Verma',
      size: '1.5 MB',
      fileType: 'PDF',
      dateAdded: '10 Mar, 2024',
      downloads: 112,
      thumbnail: IMAGES.pdf,
    },
    {
      id: '4',
      title: 'Biology Diagrams Collection',
      description: 'High-quality diagrams of cell structures and human anatomy',
      subject: 'Biology',
      type: 'Notes',
      teacher: 'Dr. Suresh Kumar',
      size: '4.7 MB',
      fileType: 'PDF',
      dateAdded: '08 Mar, 2024',
      downloads: 76,
      thumbnail: IMAGES.pdf,
    },
    {
      id: '5',
      title: 'Computer Science Textbook',
      description: 'Complete digital textbook covering programming fundamentals',
      subject: 'Computer Science',
      type: 'Books',
      teacher: 'Prof. Amit Patel',
      size: '8.2 MB',
      fileType: 'PDF',
      dateAdded: '05 Mar, 2024',
      downloads: 94,
      thumbnail: IMAGES.book,
    },
    {
      id: '6',
      title: 'English Grammar Practice Test',
      description: 'Comprehensive test to evaluate your grammar knowledge',
      subject: 'English',
      type: 'Practice Tests',
      teacher: 'Mrs. Anjali Singh',
      size: '1.1 MB',
      fileType: 'PDF',
      dateAdded: '02 Mar, 2024',
      downloads: 68,
      thumbnail: IMAGES.test,
    },
    {
      id: '7',
      title: 'Chemistry Study Guide',
      description: 'Complete revision guide for organic and inorganic chemistry',
      subject: 'Chemistry',
      type: 'Study Guides',
      teacher: 'Dr. Meena Gupta',
      size: '3.4 MB',
      fileType: 'PDF',
      dateAdded: '28 Feb, 2024',
      downloads: 103,
      thumbnail: IMAGES.pdf,
    },
    {
      id: '8',
      title: 'Physics Video Lectures Series',
      description: 'Complete set of video lectures covering the entire syllabus',
      subject: 'Physics',
      type: 'Videos',
      teacher: 'Prof. Rahul Verma',
      size: '350 MB',
      fileType: 'MP4',
      dateAdded: '25 Feb, 2024',
      downloads: 142,
      thumbnail: IMAGES.video,
    },
  ]);
  
  // Filter resources based on search query and selected category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      activeCategory === 'All' || 
      resource.type === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Render category items
  const renderCategoryItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        activeCategory === item && styles.activeCategoryButton,
      ]}
      onPress={() => setActiveCategory(item)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          activeCategory === item && styles.activeCategoryButtonText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  // Render resource items
  const renderResourceItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.resourceCard}
      onPress={() => navigation.navigate('ResourceDetails', { resourceId: item.id })}
    >
      <Image source={item.thumbnail} style={styles.resourceThumbnail} />
      <View style={styles.resourceContent}>
        <View style={styles.resourceHeader}>
          <Text style={styles.resourceTitle}>{item.title}</Text>
          <View style={styles.fileTypeContainer}>
            <Text style={styles.fileTypeText}>{item.fileType}</Text>
          </View>
        </View>
        
        <Text style={styles.resourceDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.resourceFooter}>
          <View style={styles.resourceDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="book-outline" size={12} color={COLORS.gray} />
              <Text style={styles.detailText}>{item.subject}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="person-outline" size={12} color={COLORS.gray} />
              <Text style={styles.detailText}>{item.teacher}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="download-outline" size={12} color={COLORS.gray} />
              <Text style={styles.detailText}>{item.downloads}</Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={() => navigation.navigate('DownloadResource', { resourceId: item.id })}
          >
            <Ionicons name="download-outline" size={16} color={COLORS.white} />
            <Text style={styles.downloadButtonText}>Download</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Empty state component
  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="document-outline" size={60} color={COLORS.lightGray} />
      <Text style={styles.emptyTitle}>No Resources Found</Text>
      <Text style={styles.emptyText}>
        Try adjusting your search or selecting a different category.
      </Text>
    </View>
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
        <Text style={styles.headerTitle}>Learning Resources</Text>
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={() => navigation.navigate('Bookmarks')}
        >
          <Ionicons name="bookmark-outline" size={24} color={COLORS.text} />
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
          renderItem={renderCategoryItem}
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
        ListEmptyComponent={EmptyListComponent}
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
  bookmarkButton: {
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
    paddingVertical: SIZES.padding / 2,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
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
    width: 60,
    height: 60,
    borderRadius: SIZES.radius / 2,
    marginRight: SIZES.padding,
  },
  resourceContent: {
    flex: 1,
  },
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  resourceTitle: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: 'bold',
    flex: 1,
    marginRight: SIZES.padding,
  },
  fileTypeContainer: {
    backgroundColor: COLORS.lightGray2,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  fileTypeText: {
    ...FONTS.body5,
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  resourceDescription: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: SIZES.padding,
  },
  resourceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resourceDetails: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.padding,
    marginBottom: 4,
  },
  detailText: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginLeft: 4,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    borderRadius: SIZES.radius / 2,
  },
  downloadButtonText: {
    ...FONTS.body5,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SIZES.padding * 5,
  },
  emptyTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding / 2,
  },
  emptyText: {
    ...FONTS.body4,
    color: COLORS.gray,
    textAlign: 'center',
    paddingHorizontal: SIZES.padding * 2,
  },
});

export default Resources; 