# Padho Likho App

A comprehensive education platform connecting students, teachers, and parents.

## Features

- **User Roles**: Student, Teacher, and Parent interfaces
- **Live Classes**: Real-time virtual classrooms
- **Assignment Management**: Create, submit, and grade assignments
- **Payment Processing**: Secure payment for classes and sessions
- **User Profiles**: Customizable profiles for all users
- **Session Management**: Schedule and manage teaching sessions

## Technologies

- React Native with Expo
- Firebase (Authentication, Firestore, Storage)
- TypeScript
- React Navigation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Firebase account

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/padho-likho-app.git
   cd padho-likho-app
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Set up Firebase
   - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password, Google)
   - Create Firestore database
   - Set up Storage

4. Configure Firebase
   - Create a `.env` file in the root directory
   - Add your Firebase configuration:
     ```
     EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
     EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
     EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
     EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
     EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
     ```

5. Start the development server
   ```
   npx expo start
   ```

## Deployment

### Firebase Hosting

1. Install Firebase CLI
   ```
   npm install -g firebase-tools
   ```

2. Login to Firebase
   ```
   firebase login
   ```

3. Initialize Firebase in your project
   ```
   firebase init
   ```
   - Select Hosting
   - Select your Firebase project
   - Set the public directory to `web-build`
   - Configure as a single-page app: Yes
   - Set up automatic builds and deploys: No

4. Build the web version
   ```
   expo build:web
   ```

5. Deploy to Firebase
   ```
   firebase deploy
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Expo](https://expo.dev/)
- [Firebase](https://firebase.google.com/)
- [React Navigation](https://reactnavigation.org/) 