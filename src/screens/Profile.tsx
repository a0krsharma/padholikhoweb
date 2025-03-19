import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Share,
  Modal,
  TextInput,
  Alert,
  Clipboard
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONTS, SIZES } from '../constants';

const Profile = ({ navigation }: any) => {
  const [showReferModal, setShowReferModal] = useState(false);
  
  // Mock rewards data
  const rewards = [
    { id: 1, code: 'STUDY25', discount: '25%', expiry: '31 Dec 2023' },
    { id: 2, code: 'FREECL10', discount: 'Free Class', expiry: '15 Jan 2024' },
  ];
  
  const menuItems = [
    { id: 'edit', title: 'Edit Profile', icon: 'create-outline' },
    { id: 'Session', title: 'My Sessions', icon: 'calendar-outline' },
    { id: 'favorites', title: 'Favorites', icon: 'heart-outline' },
    { id: 'referral', title: 'Refer & Earn', icon: 'gift-outline' },
    { id: 'Notifications', title: 'Notifications', icon: 'notifications-outline' },
    { id: 'Settings', title: 'Settings', icon: 'settings-outline' },
    { id: 'Help', title: 'Help & Support', icon: 'help-circle-outline' },
    { id: 'logout', title: 'Logout', icon: 'log-out-outline' },
  ];

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Join Padho Likho App and get 25% off on your first session! Use my referral code: FRIEND123',
        url: 'https://padholikho.app/download',
        title: 'Padho Likho App - Learn with the best teachers'
      });
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          Alert.alert('Success', 'Referral link shared successfully!');
        } else {
          // shared
          Alert.alert('Success', 'Referral link shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert('Error', 'Error sharing referral link');
    }
  };

  const handleMenuPress = (item: any) => {
    if (item.id === 'logout') {
      navigation.navigate('Auth', { screen: 'Login' });
    } else if (item.id === 'referral') {
      setShowReferModal(true);
    } else if (item.id === 'favorites') {
      // This screen doesn't exist yet
      Alert.alert('Coming Soon', `The ${item.title} feature will be available soon!`);
    } else if (item.id === 'edit') {
      navigation.navigate('EditProfile');
    } else {
      navigation.navigate(item.id);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString('FRIEND123');
    Alert.alert('Copied!', 'Referral code copied to clipboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Ionicons name="person-circle" size={100} color={COLORS.primary} />
            <TouchableOpacity 
              style={styles.editImageButton}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Ionicons name="camera-outline" size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Teachers</Text>
            </View>
          </View>
        </View>

        {/* Refer & Earn Banner */}
        <TouchableOpacity 
          style={styles.referBanner}
          onPress={() => setShowReferModal(true)}
        >
          <View style={styles.referBannerContent}>
            <Text style={styles.referBannerTitle}>Refer & Earn</Text>
            <Text style={styles.referBannerText}>
              Invite friends and earn up to 50% off on your next session!
            </Text>
            <View style={styles.referButton}>
              <Text style={styles.referButtonText}>Refer Now</Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
            </View>
          </View>
          <View style={styles.referIconContainer}>
            <Ionicons name="gift" size={50} color={COLORS.white} />
          </View>
        </TouchableOpacity>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item)}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon} size={24} color={COLORS.primary} style={styles.menuIcon} />
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Refer & Earn Modal */}
        <Modal
          visible={showReferModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowReferModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Refer & Earn</Text>
                <TouchableOpacity
                  onPress={() => setShowReferModal(false)}
                >
                  <Ionicons name="close" size={24} color={COLORS.text} />
                </TouchableOpacity>
              </View>

              <View style={styles.referralCodeContainer}>
                <Text style={styles.referralLabel}>Your Referral Code</Text>
                <View style={styles.codeContainer}>
                  <Text style={styles.referralCode}>FRIEND123</Text>
                  <TouchableOpacity 
                    style={styles.copyButton}
                    onPress={copyToClipboard}
                  >
                    <Ionicons name="copy-outline" size={20} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.referralDescription}>
                  Share this code with friends. When they sign up, you both get rewards!
                </Text>
              </View>

              <TouchableOpacity 
                style={styles.shareButton}
                onPress={handleShare}
              >
                <Ionicons name="share-social-outline" size={20} color={COLORS.white} />
                <Text style={styles.shareButtonText}>Share Your Code</Text>
              </TouchableOpacity>

              <View style={styles.rewardsSection}>
                <Text style={styles.rewardsTitle}>Your Rewards</Text>
                
                {rewards.length > 0 ? (
                  rewards.map((reward) => (
                    <View key={reward.id} style={styles.rewardCard}>
                      <View style={styles.rewardInfo}>
                        <Text style={styles.rewardCode}>{reward.code}</Text>
                        <Text style={styles.rewardDiscount}>{reward.discount} OFF</Text>
                        <Text style={styles.rewardExpiry}>Valid till: {reward.expiry}</Text>
                      </View>
                      <TouchableOpacity style={styles.useNowButton}>
                        <Text style={styles.useNowText}>Use Now</Text>
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <View style={styles.noRewardsContainer}>
                    <Ionicons name="ticket-outline" size={60} color={COLORS.gray} />
                    <Text style={styles.noRewardsText}>No rewards yet</Text>
                    <Text style={styles.noRewardsSubtext}>
                      Refer friends to earn rewards and discounts
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.howItWorksContainer}>
                <Text style={styles.howItWorksTitle}>How It Works</Text>
                <View style={styles.stepContainer}>
                  <View style={styles.stepCircle}>
                    <Text style={styles.stepNumber}>1</Text>
                  </View>
                  <Text style={styles.stepText}>Share your referral code with friends</Text>
                </View>
                <View style={styles.stepContainer}>
                  <View style={styles.stepCircle}>
                    <Text style={styles.stepNumber}>2</Text>
                  </View>
                  <Text style={styles.stepText}>Friend signs up using your code</Text>
                </View>
                <View style={styles.stepContainer}>
                  <View style={styles.stepCircle}>
                    <Text style={styles.stepNumber}>3</Text>
                  </View>
                  <Text style={styles.stepText}>Both of you receive reward coupons</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
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
    alignItems: 'center',
    padding: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: SIZES.padding,
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  name: {
    ...FONTS.h2,
    color: COLORS.text,
    marginBottom: 4,
  },
  email: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: SIZES.padding * 2,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.input,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    ...FONTS.h3,
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.border,
  },
  referBanner: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    margin: SIZES.padding * 2,
    borderRadius: SIZES.radius,
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
  referBannerContent: {
    flex: 3,
    paddingRight: SIZES.padding,
  },
  referBannerTitle: {
    ...FONTS.h3,
    color: COLORS.white,
    marginBottom: SIZES.padding / 2,
  },
  referBannerText: {
    ...FONTS.body4,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: SIZES.padding,
  },
  referButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
    paddingVertical: SIZES.padding / 2,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius / 2,
  },
  referButtonText: {
    ...FONTS.body4,
    color: COLORS.white,
    fontWeight: 'bold',
    marginRight: 5,
  },
  referIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    padding: SIZES.padding * 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: SIZES.padding,
  },
  menuTitle: {
    ...FONTS.body3,
    color: COLORS.text,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    padding: SIZES.padding * 2,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
  },
  modalTitle: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  referralCodeContainer: {
    backgroundColor: COLORS.input,
    padding: SIZES.padding * 2,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding * 2,
  },
  referralLabel: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: SIZES.padding / 2,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
    borderRadius: SIZES.radius / 2,
    marginBottom: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  referralCode: {
    ...FONTS.h3,
    color: COLORS.primary,
    letterSpacing: 2,
  },
  copyButton: {
    padding: SIZES.padding / 2,
  },
  referralDescription: {
    ...FONTS.body4,
    color: COLORS.text,
  },
  shareButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding * 2,
  },
  shareButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: SIZES.padding / 2,
  },
  rewardsSection: {
    marginBottom: SIZES.padding * 2,
  },
  rewardsTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  rewardCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardCode: {
    ...FONTS.body3,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rewardDiscount: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: 4,
  },
  rewardExpiry: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  useNowButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: SIZES.padding / 2,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius / 2,
  },
  useNowText: {
    ...FONTS.body4,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  noRewardsContainer: {
    alignItems: 'center',
    padding: SIZES.padding * 2,
  },
  noRewardsText: {
    ...FONTS.h3,
    color: COLORS.text,
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding / 2,
  },
  noRewardsSubtext: {
    ...FONTS.body4,
    color: COLORS.gray,
    textAlign: 'center',
  },
  howItWorksContainer: {
    marginBottom: SIZES.padding * 2,
  },
  howItWorksTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  stepNumber: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  stepText: {
    ...FONTS.body3,
    color: COLORS.text,
    flex: 1,
  },
});

export default Profile; 