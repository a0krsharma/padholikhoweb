import React, { useState, useCallback, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
  Linking,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants';

const Help = ({ navigation }: any) => {
  const [query, setQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  
  // FAQ data
  const faqs = [
    {
      id: 1,
      question: 'How do I book a session with a teacher?',
      answer: 'You can book a session from the Home screen by tapping on "Book a Teacher" card. You can also visit a teacher\'s profile and tap on "Book a Session".'
    },
    {
      id: 2,
      question: 'How do I cancel or reschedule a session?',
      answer: 'Go to "My Sessions" from your profile. Find the session you want to cancel or reschedule and tap on it. You will see options to cancel or reschedule the session.'
    },
    {
      id: 3,
      question: 'How do payment refunds work?',
      answer: 'If you cancel a session at least 24 hours before the scheduled time, you will receive a full refund. Cancellations made within 24 hours will receive a partial refund of 50%.'
    },
    {
      id: 4,
      question: 'How can I become a teacher on Padho Likho?',
      answer: 'To become a teacher, you need to apply through our website. You\'ll need to provide your educational qualifications, teaching experience, and undergo a verification process.'
    },
    {
      id: 5,
      question: 'Is there a mobile app for teachers?',
      answer: 'Yes, we have a separate app for teachers called "Padho Likho for Teachers" available on both Android and iOS platforms.'
    },
    {
      id: 6,
      question: 'How can I report an issue with a teacher?',
      answer: 'You can report an issue by visiting the teacher\'s profile and tapping on "Report". You can also contact our support team directly from the Help & Support section.'
    },
  ];

  // Support options
  const supportOptions = [
    {
      id: 1,
      title: 'Chat with Us',
      icon: 'chatbubbles-outline',
      description: 'Get instant support via chat',
      onPress: () => handleSupportOptionPress('chat'),
    },
    {
      id: 2,
      title: 'Email Us',
      icon: 'mail-outline',
      description: 'Send us an email at support@padholikho.com',
      onPress: () => handleSupportOptionPress('email'),
    },
    {
      id: 3,
      title: 'Call Us',
      icon: 'call-outline',
      description: 'Call our support center (9 AM - 6 PM)',
      onPress: () => handleSupportOptionPress('call'),
    },
  ];

  const handleSupportOptionPress = useCallback((type: string) => {
    setIsSearching(true);
    
    // Simulate some processing time
    setTimeout(() => {
      setIsSearching(false);
      
      switch (type) {
        case 'chat':
          Alert.alert(
            'Chat Support', 
            'Connecting to customer support agent...',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Connect',
                onPress: () => Alert.alert('Success', 'Connected to support agent'),
              },
            ]
          );
          break;
          
        case 'email':
          Linking.openURL('mailto:support@padholikho.com').catch(() => {
            Alert.alert('Error', 'Could not open email client');
          });
          break;
          
        case 'call':
          Linking.openURL('tel:+918000000000').catch(() => {
            Alert.alert('Error', 'Could not open phone dialer');
          });
          break;
      }
    }, 500);
  }, []);

  const handleSearch = useCallback(() => {
    Keyboard.dismiss();
    
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
    // Simulate search delay for better UX
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const results = faqs
        .filter(faq => 
          faq.question.toLowerCase().includes(lowerQuery) || 
          faq.answer.toLowerCase().includes(lowerQuery)
        )
        .map(faq => faq.id);
      
      setSearchResults(results);
      setIsSearching(false);
      
      if (results.length > 0) {
        // Auto-expand the first result
        setExpandedFaq(results[0]);
        
        // Scroll to the first result with a small delay to ensure the layout is complete
        setTimeout(() => {
          if (scrollViewRef.current) {
            // This scroll would be more precise in a real app with element measurements
            scrollViewRef.current.scrollTo({ y: 400, animated: true });
          }
        }, 300);
      } else {
        Alert.alert(
          'No Matches Found', 
          'We couldn\'t find an answer to your question. Would you like to contact our support team?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Contact Support',
              onPress: () => handleSupportOptionPress('chat'),
            },
          ]
        );
      }
    }, 500);
  }, [query, faqs, handleSupportOptionPress]);

  const toggleFaq = useCallback((id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  }, [expandedFaq]);

  const renderFaq = useCallback((faq: any) => {
    const isExpanded = expandedFaq === faq.id;
    const isHighlighted = searchResults.includes(faq.id);
    
    return (
      <TouchableOpacity 
        key={faq.id}
        style={[
          styles.faqItem,
          isExpanded && styles.faqItemExpanded,
          isHighlighted && styles.faqItemHighlighted
        ]}
        onPress={() => toggleFaq(faq.id)}
        activeOpacity={0.8}
        accessibilityLabel={`FAQ: ${faq.question}. ${isExpanded ? 'Double tap to collapse' : 'Double tap to expand'}`}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
      >
        <View style={styles.faqQuestion}>
          <Text style={[
            styles.faqQuestionText,
            isHighlighted && styles.faqHighlightedText
          ]}>
            {faq.question}
          </Text>
          <Ionicons 
            name={isExpanded ? 'chevron-up' : 'chevron-down'} 
            size={20} 
            color={COLORS.primary} 
          />
        </View>
        
        {isExpanded && (
          <View style={styles.faqAnswer}>
            <Text style={styles.faqAnswerText}>{faq.answer}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }, [expandedFaq, searchResults, toggleFaq]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color={COLORS.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for help"
              placeholderTextColor={COLORS.placeholder}
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              accessibilityLabel="Search for help"
              clearButtonMode="while-editing"
            />
            {query ? (
              <TouchableOpacity 
                onPress={() => {
                  setQuery('');
                  setSearchResults([]);
                }}
                accessibilityLabel="Clear search"
              >
                <Ionicons name="close-circle" size={20} color={COLORS.gray} />
              </TouchableOpacity>
            ) : null}
          </View>
          <TouchableOpacity 
            style={[
              styles.searchButton,
              !query.trim() && styles.searchButtonDisabled
            ]} 
            onPress={handleSearch}
            disabled={!query.trim() || isSearching}
            accessibilityLabel="Search"
          >
            {isSearching ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Text style={styles.searchButtonText}>Search</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Support Options */}
        <View style={styles.supportSection}>
          <Text style={styles.sectionTitle}>Contact Support</Text>
          <View style={styles.supportOptionsContainer}>
            {supportOptions.map((option) => (
              <TouchableOpacity 
                key={option.id} 
                style={styles.supportOption}
                onPress={option.onPress}
                accessibilityLabel={option.title}
                accessibilityHint={option.description}
              >
                <View style={styles.supportIconContainer}>
                  <Ionicons name={option.icon} size={28} color={COLORS.white} />
                </View>
                <Text style={styles.supportOptionTitle}>{option.title}</Text>
                <Text style={styles.supportOptionDescription}>{option.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>
            Frequently Asked Questions
            {searchResults.length > 0 && ` (${searchResults.length} results)`}
          </Text>
          
          {searchResults.length > 0 ? (
            // Show search results
            faqs
              .filter(faq => searchResults.includes(faq.id))
              .map(renderFaq)
          ) : (
            // Show all FAQs
            faqs.map(renderFaq)
          )}
        </View>

        {/* Additional Resources */}
        <View style={styles.resourcesSection}>
          <Text style={styles.sectionTitle}>Additional Resources</Text>
          
          <TouchableOpacity 
            style={styles.resourceItem}
            accessibilityLabel="User Guide"
          >
            <Ionicons name="document-text-outline" size={24} color={COLORS.primary} />
            <Text style={styles.resourceText}>User Guide</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.resourceItem}
            accessibilityLabel="Tutorial Videos"
          >
            <Ionicons name="videocam-outline" size={24} color={COLORS.primary} />
            <Text style={styles.resourceText}>Tutorial Videos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.resourceItem}
            accessibilityLabel="Blog & Articles"
          >
            <Ionicons name="book-outline" size={24} color={COLORS.primary} />
            <Text style={styles.resourceText}>Blog & Articles</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {isSearching && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.primary} />
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
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding * 2,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.input,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    marginRight: SIZES.padding,
  },
  searchInput: {
    flex: 1,
    ...FONTS.body3,
    color: COLORS.text,
    padding: SIZES.padding,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    minWidth: 70,
    alignItems: 'center',
  },
  searchButtonDisabled: {
    backgroundColor: COLORS.primary + '80',
  },
  searchButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
  },
  supportSection: {
    padding: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  supportOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  supportOption: {
    width: '30%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  supportIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  supportOptionTitle: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  supportOptionDescription: {
    ...FONTS.body5,
    color: COLORS.gray,
    textAlign: 'center',
  },
  faqSection: {
    padding: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  faqItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
    padding: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  faqItemExpanded: {
    backgroundColor: COLORS.white,
  },
  faqItemHighlighted: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestionText: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: 'bold',
    flex: 1,
  },
  faqHighlightedText: {
    color: COLORS.primary,
  },
  faqAnswer: {
    marginTop: SIZES.padding,
    paddingTop: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  faqAnswerText: {
    ...FONTS.body3,
    color: COLORS.text,
  },
  resourcesSection: {
    padding: SIZES.padding * 2,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  resourceText: {
    ...FONTS.body3,
    color: COLORS.text,
    marginLeft: SIZES.padding,
  },
  loadingOverlay: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Help; 