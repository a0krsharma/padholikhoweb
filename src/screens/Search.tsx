import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants';

const Search = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All' },
    { id: 'teachers', name: 'Teachers' },
    { id: 'subjects', name: 'Subjects' },
    { id: 'courses', name: 'Courses' },
  ];

  const recentSearches = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.gray} style={{marginRight: SIZES.padding}} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search teachers, subjects, or courses"
            placeholderTextColor={COLORS.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                selectedFilter === filter.id && styles.filterButtonActive
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter.id && styles.filterTextActive
              ]}>
                {filter.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recent Searches */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          {recentSearches.map((search, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.recentSearchItem}
              onPress={() => setSearchQuery(search)}
            >
              <Ionicons name="time-outline" size={20} color={COLORS.gray} style={{marginRight: SIZES.padding}} />
              <Text style={styles.recentSearchText}>{search}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Searches */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Searches</Text>
          <View style={styles.popularContainer}>
            {recentSearches.map((search, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.popularTag}
                onPress={() => setSearchQuery(search)}
              >
                <Text style={styles.popularText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.input,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    height: 50,
  },
  searchInput: {
    flex: 1,
    ...FONTS.body3,
    color: COLORS.text,
  },
  content: {
    flex: 1,
  },
  filtersContainer: {
    padding: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterButton: {
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.input,
    marginRight: SIZES.padding,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  filterTextActive: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  section: {
    padding: SIZES.padding * 2,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  recentSearchText: {
    ...FONTS.body3,
    color: COLORS.text,
  },
  popularContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SIZES.padding,
  },
  popularTag: {
    backgroundColor: COLORS.input,
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    margin: SIZES.padding,
  },
  popularText: {
    ...FONTS.body4,
    color: COLORS.text,
  },
});

export default Search; 