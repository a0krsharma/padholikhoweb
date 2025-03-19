// Define icon mappings using React Native Vector Icons
// This allows us to use consistent icons throughout the app

const ICONS = {
  // App navigation
  home: 'home',
  profile: 'person',
  teachers: 'school',
  resources: 'book',
  schedule: 'calendar',
  settings: 'settings',
  payments: 'card',
  notifications: 'notifications',
  chat: 'chatbubble',
  
  // Action icons
  back: 'arrow-back',
  next: 'arrow-forward',
  close: 'close',
  add: 'add',
  edit: 'create',
  delete: 'trash',
  search: 'search',
  filter: 'filter',
  download: 'download',
  share: 'share',
  bookmark: 'bookmark',
  bookmarkOutline: 'bookmark-outline',
  star: 'star',
  starOutline: 'star-outline',
  
  // User roles
  student: 'school-outline',
  teacher: 'book-outline',
  parent: 'people-outline',
  
  // Subject icons
  mathematics: 'calculator',
  physics: 'flask',
  chemistry: 'flask',
  biology: 'leaf',
  history: 'time',
  geography: 'globe',
  literature: 'book',
  language: 'language',
  
  // Payment related
  wallet: 'wallet',
  creditCard: 'card',
  
  // Social
  google: 'logo-google',
  facebook: 'logo-facebook',
  apple: 'logo-apple',
  
  // Miscellaneous
  time: 'time',
  location: 'location',
  video: 'videocam',
  document: 'document',
  info: 'information-circle',
  help: 'help-circle',
  warning: 'warning',
  error: 'alert-circle',
  success: 'checkmark-circle',
  lock: 'lock-closed',
  unlock: 'lock-open',
  mail: 'mail',
  phone: 'call',
};

// Export as both default and named export
export { ICONS };
export default ICONS; 