import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import {getFirestore, provideFirestore } from '@angular/fire/firestore';
import {getAuth , provideAuth } from '@angular/fire/auth';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { getStorage , provideStorage} from '@angular/fire/storage';
import { environment } from '../environments/environment.development';
import { provideHttpClient } from '@angular/common/http';
const firebaseConfig = {
  apiKey: "AIzaSyAMOacsBiBmWQm_DsL0eU-YD-0Lqzr8E-c",
  authDomain: "play-box-8192c.firebaseapp.com",
  projectId: "play-box-8192c",
  storageBucket: "play-box-8192c.appspot.com",
  messagingSenderId: "707326099435",
  appId: "1:707326099435:web:c014b77ef55b53d8a6e3ae",
  measurementId: "G-R4LE23N39N"
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideFirebaseApp(()=> initializeApp(
      environment.firebase
    )),
    provideAuth(()=>getAuth()),
    provideFirestore(()=> getFirestore()),
    provideStorage(()=>getStorage())
  ]
};
