import { config } from './config';

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyAbDtjgwCMJU6W_K7M27Q-yXIFn2g9W6mk",
    authDomain: "tmc-app-aefc3.firebaseapp.com",
    projectId: "tmc-app-aefc3",
    storageBucket: "tmc-app-aefc3.appspot.com",
    messagingSenderId: "847352531826",
    appId: "1:847352531826:web:fdb1ee8bbf7ae509886beb"
  },
  ...config
};
