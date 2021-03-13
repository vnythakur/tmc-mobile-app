// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { config } from './config';

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
