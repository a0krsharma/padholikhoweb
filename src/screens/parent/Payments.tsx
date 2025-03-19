import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES, IMAGES } from '../../constants';

const Payments = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('history');
  const [selectedChild, setSelectedChild] = useState('all');
  
  // Mock payment methods data
  const paymentMethods = [
    {
      id: '1',
      type: 'credit',
      cardNumber: '**** **** **** 4582',
      cardHolder: 'Rajesh Kumar',
      expiryDate: '05/25',
      cardType: 'visa',
      isDefault: true,
    },
    {
      id: '2',
      type: 'credit',
      cardNumber: '**** **** **** 7890',
      cardHolder: 'Rajesh Kumar',
      expiryDate: '09/26',
      cardType: 'mastercard',
      isDefault: false,
    },
    {
      id: '3',
      type: 'upi',
      upiId: 'rajesh.kumar@okaxis',
      isDefault: false,
    },
  ];
  
  // Mock children data
  const children = [
    { id: 'all', name: 'All Children' },
    { id: '1', name: 'Arjun Kumar' },
    { id: '2', name: 'Neha Kumar' },
  ];
  
  // Mock payment history data
  const paymentHistory = [
    {
      id: '1',
      childId: '1',
      childName: 'Arjun Kumar',
      amount: 2500,
      date: '2024-03-15',
      status: 'completed', // completed, pending, failed
      description: 'Mathematics - 5 Sessions Package',
      teacherName: 'Dr. Sharma',
      paymentMethod: 'Credit Card *4582',
      invoiceNumber: 'INV-2024-0123',
    },
    {
      id: '2',
      childId: '1',
      childName: 'Arjun Kumar',
      amount: 2000,
      date: '2024-03-05',
      status: 'completed',
      description: 'Physics - 4 Sessions Package',
      teacherName: 'Mrs. Patel',
      paymentMethod: 'UPI',
      invoiceNumber: 'INV-2024-0119',
    },
    {
      id: '3',
      childId: '2',
      childName: 'Neha Kumar',
      amount: 1800,
      date: '2024-03-10',
      status: 'completed',
      description: 'English - 3 Sessions Package',
      teacherName: 'Mr. Singh',
      paymentMethod: 'Credit Card *7890',
      invoiceNumber: 'INV-2024-0121',
    },
    {
      id: '4',
      childId: '2',
      childName: 'Neha Kumar',
      amount: 1200,
      date: '2024-02-25',
      status: 'completed',
      description: 'Science - 2 Sessions Package',
      teacherName: 'Dr. Gupta',
      paymentMethod: 'Credit Card *4582',
      invoiceNumber: 'INV-2024-0115',
    },
  ];
  
  // Mock pending payments data
  const pendingPayments = [
    {
      id: '1',
      childId: '1',
      childName: 'Arjun Kumar',
      amount: 3000,
      dueDate: '2024-03-25',
      description: 'Chemistry - 6 Sessions Package',
      teacherName: 'Dr. Verma',
      invoiceNumber: 'INV-2024-0125',
    },
  ];

  // Filter payments based on selected child
  const filteredHistory = paymentHistory.filter(item => 
    selectedChild === 'all' || item.childId === selectedChild
  );
  
  const filteredPending = pendingPayments.filter(item => 
    selectedChild === 'all' || item.childId === selectedChild
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed':
        return COLORS.green;
      case 'pending':
        return COLORS.primary;
      case 'failed':
        return COLORS.red;
      default:
        return COLORS.gray;
    }
  };

  const renderChildSelector = () => (
    <View style={styles.childSelectorContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.childSelectorScroll}
      >
        {children.map(child => (
          <TouchableOpacity
            key={child.id}
            style={[
              styles.childItem,
              selectedChild === child.id && styles.selectedChildItem
            ]}
            onPress={() => setSelectedChild(child.id)}
          >
            <Text 
              style={[
                styles.childName,
                selectedChild === child.id && styles.selectedChildName
              ]}
            >
              {child.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderPaymentMethod = (method: any) => (
    <TouchableOpacity 
      style={styles.paymentMethodCard}
      onPress={() => navigation.navigate('PaymentDetails', { paymentMethodId: method.id })}
    >
      <View style={styles.paymentMethodHeader}>
        {method.type === 'credit' ? (
          <>
            <Image 
              source={
                method.cardType === 'visa' 
                  ? IMAGES.visa
                  : IMAGES.mastercard
              }
              style={styles.cardTypeIcon}
              resizeMode="contain"
            />
            {method.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Default</Text>
              </View>
            )}
          </>
        ) : (
          <>
            <Image 
              source={IMAGES.upi}
              style={styles.cardTypeIcon}
              resizeMode="contain"
            />
            {method.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Default</Text>
              </View>
            )}
          </>
        )}
      </View>
      
      <View style={styles.paymentMethodBody}>
        {method.type === 'credit' ? (
          <>
            <Text style={styles.cardNumber}>{method.cardNumber}</Text>
            <View style={styles.cardDetailsRow}>
              <Text style={styles.cardHolderLabel}>Card Holder</Text>
              <Text style={styles.expiryLabel}>Expires</Text>
            </View>
            <View style={styles.cardDetailsRow}>
              <Text style={styles.cardHolder}>{method.cardHolder}</Text>
              <Text style={styles.expiry}>{method.expiryDate}</Text>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.upiLabel}>UPI ID</Text>
            <Text style={styles.upiId}>{method.upiId}</Text>
          </>
        )}
      </View>
      
      <View style={styles.paymentMethodActions}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate('EditPaymentMethod', { paymentMethodId: method.id })}
        >
          <Ionicons name="pencil-outline" size={18} color={COLORS.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => {
            // Delete payment method logic
          }}
        >
          <Ionicons name="trash-outline" size={18} color={COLORS.red} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderPaymentHistoryItem = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.historyItem}
      onPress={() => navigation.navigate('PaymentDetails', { paymentId: item.id })}
    >
      <View style={styles.historyItemHeader}>
        <View style={styles.historyItemLeft}>
          <Text style={styles.historyAmount}>₹{item.amount}</Text>
          <Text style={styles.historyDate}>{formatDate(item.date)}</Text>
        </View>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: getStatusColor(item.status) + '20' }
        ]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status === 'completed' ? 'Paid' : item.status === 'pending' ? 'Pending' : 'Failed'}
          </Text>
        </View>
      </View>
      
      <View style={styles.historyItemBody}>
        <Text style={styles.historyDescription}>{item.description}</Text>
        <View style={styles.historyDetailRow}>
          <Text style={styles.historyDetailLabel}>Child:</Text>
          <Text style={styles.historyDetailValue}>{item.childName}</Text>
        </View>
        <View style={styles.historyDetailRow}>
          <Text style={styles.historyDetailLabel}>Teacher:</Text>
          <Text style={styles.historyDetailValue}>{item.teacherName}</Text>
        </View>
        <View style={styles.historyDetailRow}>
          <Text style={styles.historyDetailLabel}>Payment Method:</Text>
          <Text style={styles.historyDetailValue}>{item.paymentMethod}</Text>
        </View>
        <View style={styles.historyDetailRow}>
          <Text style={styles.historyDetailLabel}>Invoice:</Text>
          <Text style={styles.historyDetailValue}>{item.invoiceNumber}</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.downloadButton}>
        <Ionicons name="download-outline" size={16} color={COLORS.primary} />
        <Text style={styles.downloadButtonText}>Download Receipt</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderPendingPaymentItem = ({ item }: any) => (
    <View style={styles.pendingItem}>
      <View style={styles.pendingItemHeader}>
        <View style={styles.pendingItemLeft}>
          <Text style={styles.pendingAmount}>₹{item.amount}</Text>
          <Text style={styles.pendingDueDate}>Due: {formatDate(item.dueDate)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.payNowButton}
          onPress={() => navigation.navigate('MakePayment', { paymentId: item.id })}
        >
          <Text style={styles.payNowButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.pendingItemBody}>
        <Text style={styles.pendingDescription}>{item.description}</Text>
        <View style={styles.pendingDetailRow}>
          <Text style={styles.pendingDetailLabel}>Child:</Text>
          <Text style={styles.pendingDetailValue}>{item.childName}</Text>
        </View>
        <View style={styles.pendingDetailRow}>
          <Text style={styles.pendingDetailLabel}>Teacher:</Text>
          <Text style={styles.pendingDetailValue}>{item.teacherName}</Text>
        </View>
        <View style={styles.pendingDetailRow}>
          <Text style={styles.pendingDetailLabel}>Invoice:</Text>
          <Text style={styles.pendingDetailValue}>{item.invoiceNumber}</Text>
        </View>
      </View>
    </View>
  );

  const renderPaymentMethods = () => (
    <View style={styles.paymentMethodsContainer}>
      <FlatList
        data={paymentMethods}
        renderItem={({ item }) => renderPaymentMethod(item)}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.paymentMethodsList}
      />
      
      <TouchableOpacity 
        style={styles.addPaymentMethodButton}
        onPress={() => navigation.navigate('AddPaymentMethod')}
      >
        <Ionicons name="add-circle-outline" size={20} color={COLORS.primary} />
        <Text style={styles.addPaymentMethodText}>Add Payment Method</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPaymentHistory = () => (
    <View style={styles.historyContainer}>
      {filteredHistory.length > 0 ? (
        <FlatList
          data={filteredHistory}
          renderItem={renderPaymentHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.historyList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={60} color={COLORS.lightGray} />
          <Text style={styles.emptyTitle}>No Payment History</Text>
          <Text style={styles.emptyText}>
            You haven't made any payments yet for the selected child.
          </Text>
        </View>
      )}
    </View>
  );

  const renderPendingPayments = () => (
    <View style={styles.pendingContainer}>
      {filteredPending.length > 0 ? (
        <FlatList
          data={filteredPending}
          renderItem={renderPendingPaymentItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.pendingList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="checkmark-circle-outline" size={60} color={COLORS.green} />
          <Text style={styles.emptyTitle}>No Pending Payments</Text>
          <Text style={styles.emptyText}>
            You don't have any pending payments for the selected child. All payments are up to date.
          </Text>
        </View>
      )}
    </View>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'methods':
        return renderPaymentMethods();
      case 'history':
        return renderPaymentHistory();
      case 'pending':
        return renderPendingPayments();
      default:
        return renderPaymentHistory();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payments</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'history' && styles.activeTab
          ]}
          onPress={() => setActiveTab('history')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'history' && styles.activeTabText
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'pending' && styles.activeTab
          ]}
          onPress={() => setActiveTab('pending')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'pending' && styles.activeTabText
            ]}
          >
            Pending
          </Text>
          {pendingPayments.length > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{pendingPayments.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'methods' && styles.activeTab
          ]}
          onPress={() => setActiveTab('methods')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'methods' && styles.activeTabText
            ]}
          >
            Payment Methods
          </Text>
        </TouchableOpacity>
      </View>
      
      {(activeTab === 'history' || activeTab === 'pending') && renderChildSelector()}
      
      {renderContent()}
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
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: SIZES.padding,
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    ...FONTS.body3,
    color: COLORS.gray,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  badgeContainer: {
    position: 'absolute',
    right: 15,
    top: 10,
    backgroundColor: COLORS.red,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    ...FONTS.body5,
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  childSelectorContainer: {
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  childSelectorScroll: {
    paddingHorizontal: SIZES.padding * 2,
  },
  childItem: {
    paddingVertical: SIZES.padding / 2,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
    marginRight: SIZES.padding,
    backgroundColor: COLORS.lightGray2,
  },
  selectedChildItem: {
    backgroundColor: COLORS.primary,
  },
  childName: {
    ...FONTS.body3,
    color: COLORS.text,
  },
  selectedChildName: {
    color: COLORS.white,
  },
  historyContainer: {
    flex: 1,
  },
  pendingContainer: {
    flex: 1,
  },
  paymentMethodsContainer: {
    flex: 1,
    padding: SIZES.padding * 2,
  },
  historyList: {
    padding: SIZES.padding * 2,
  },
  pendingList: {
    padding: SIZES.padding * 2,
  },
  paymentMethodsList: {
    paddingBottom: SIZES.padding * 2,
  },
  historyItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    marginBottom: SIZES.padding * 1.5,
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
  historyItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.padding,
  },
  historyItemLeft: {
    flex: 1,
  },
  historyAmount: {
    ...FONTS.h3,
    color: COLORS.text,
  },
  historyDate: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginTop: 2,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: SIZES.radius,
  },
  statusText: {
    ...FONTS.body5,
    fontWeight: 'bold',
  },
  historyItemBody: {
    marginBottom: SIZES.padding,
  },
  historyDescription: {
    ...FONTS.body3,
    color: COLORS.text,
    marginBottom: SIZES.padding / 2,
  },
  historyDetailRow: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  historyDetailLabel: {
    ...FONTS.body4,
    color: COLORS.gray,
    width: 110,
  },
  historyDetailValue: {
    ...FONTS.body4,
    color: COLORS.text,
    flex: 1,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.padding / 2,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: SIZES.padding / 2,
  },
  downloadButtonText: {
    ...FONTS.body4,
    color: COLORS.primary,
    marginLeft: 5,
  },
  pendingItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    marginBottom: SIZES.padding * 1.5,
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
  pendingItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.padding,
  },
  pendingItemLeft: {
    flex: 1,
  },
  pendingAmount: {
    ...FONTS.h3,
    color: COLORS.text,
  },
  pendingDueDate: {
    ...FONTS.body4,
    color: COLORS.red,
    marginTop: 2,
  },
  payNowButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: SIZES.radius,
  },
  payNowButtonText: {
    ...FONTS.body4,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  pendingItemBody: {
    marginBottom: SIZES.padding,
  },
  pendingDescription: {
    ...FONTS.body3,
    color: COLORS.text,
    marginBottom: SIZES.padding / 2,
  },
  pendingDetailRow: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  pendingDetailLabel: {
    ...FONTS.body4,
    color: COLORS.gray,
    width: 70,
  },
  pendingDetailValue: {
    ...FONTS.body4,
    color: COLORS.text,
    flex: 1,
  },
  paymentMethodCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    marginBottom: SIZES.padding * 1.5,
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
  paymentMethodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  cardTypeIcon: {
    width: 48,
    height: 32,
  },
  defaultBadge: {
    backgroundColor: COLORS.lightPrimary,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: SIZES.radius / 2,
  },
  defaultText: {
    ...FONTS.body5,
    color: COLORS.primary,
  },
  paymentMethodBody: {
    marginBottom: SIZES.padding,
  },
  cardNumber: {
    ...FONTS.body3,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  cardDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHolderLabel: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  expiryLabel: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  cardHolder: {
    ...FONTS.body4,
    color: COLORS.text,
  },
  expiry: {
    ...FONTS.body4,
    color: COLORS.text,
  },
  upiLabel: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginBottom: 4,
  },
  upiId: {
    ...FONTS.body3,
    color: COLORS.text,
  },
  paymentMethodActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SIZES.padding,
  },
  editButton: {
    padding: SIZES.padding / 2,
    marginRight: SIZES.padding,
  },
  deleteButton: {
    padding: SIZES.padding / 2,
  },
  addPaymentMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.padding,
    marginTop: SIZES.padding / 2,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },
  addPaymentMethodText: {
    ...FONTS.body3,
    color: COLORS.primary,
    marginLeft: SIZES.padding / 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding * 4,
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
  },
});

export default Payments; 