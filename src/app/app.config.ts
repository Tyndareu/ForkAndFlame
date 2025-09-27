import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideRouter, withComponentInputBinding } from '@angular/router';
// eslint-disable-next-line @typescript-eslint/naming-convention
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';

import { environment } from '../environments/environment.development';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    // For routing with input binding
    provideRouter(routes, withComponentInputBinding()),
    //PrimeNG
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    // Spanish locale
    { provide: LOCALE_ID, useValue: 'es-ES' },
    // Firebase
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // Firebase Auth
    provideAuth(() => getAuth()),
    // Firestore database
    provideFirestore(() => getFirestore()),
    // Firebase Storage
    provideStorage(() => getStorage()),
  ],
};
