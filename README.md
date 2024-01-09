# Photo Album Management App

Welcome to the Photo Album Management App! This React-based web application allows users to manage and view photo albums seamlessly. The app provides a user-friendly interface with features to navigate through albums and display images. [Live](https://fzn-photo-folio.onrender.com/)

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Firebase Configuration](#firebase-configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Album Management:** Easily organize and switch between different photo albums.
- **Responsive Design:** The application is designed to work smoothly on various screen sizes.
- **Firebase Integration:** Utilizes Firebase for efficient data storage and retrieval.
- **Toast Notifications:** Provides user feedback through React Toastify for a better user experience.

## Installation

- Clone the repository to your local machine:

   ```
   git clone https://github.com/your-username/photo-album-app.git
   ```
- npm install
- cd photo-album-app
## Usage
- Start the application
    ```
    npm start
    ```
- Open the browser and visit

    ```
    http://localhost:3000.
    ```

- Explore the Photo Album Management App!

## Technologies
- React: JavaScript library for building user interfaces.
- Firebase: Cloud-based platform for scalable and efficient data storage.
- React Toastify: For displaying toast notifications

## Firebase Configuration
- Make sure to set up your Firebase credentials for database connectivity. Create a firebaseInit.js file in the project root with the following content
    ```
    import firebase from 'firebase/app';
    import 'firebase/firestore';

    const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
    };

    const db = firebase.initializeApp(firebaseConfig).firestore();

    export default db;

    ```
- Replace the placeholder values with your actual Firebase project credentials.
    
