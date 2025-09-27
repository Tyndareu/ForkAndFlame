import { computed, effect, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

import { USER_ADMIN } from '../constants/constants';
import { USER_ROLES } from '../models/users.mode';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  /** Injects the Auth service from AngularFire */
  private readonly _auth = inject(Auth);

  /** Injects the Router service for navigation */
  private readonly _router = inject(Router);

  /** Provides the current user state as a signal. */
  public readonly $user = toSignal<User | null>(authState(this._auth));

  /** Provides the user role based on the user's email. */
  public readonly role = computed((): string | null => {
    const user = this.$user();
    if (!user?.email) {
      return null;
    }
    return this._getRole(user.email);
  });

  constructor() {
    effect(() => {
      const user = this.$user();
      if (!user?.email) {
        this._router.navigateByUrl('/login', { replaceUrl: true });
      }
    });
  }

  /** Signs in with Google */
  public signInWithGoogle(): Promise<UserCredential> {
    return signInWithPopup(this._auth, new GoogleAuthProvider());
  }

  /** Signs out the current user */
  public signOut(): Promise<void> {
    return signOut(this._auth);
  }

  /** Gets the role of a user based on their email */
  private _getRole(email: string): string {
    if (USER_ADMIN.admin.includes(email)) {
      return USER_ROLES.ADMIN;
    }
    return USER_ROLES.USER;
  }
}
