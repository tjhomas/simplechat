import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private afAuth: AngularFireAuth) {
    // update user$ on state change
    this.afAuth.authState
      .pipe(
        map(
          (user: firebase.User): User =>
            user && {
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              photo: user.photoURL,
            }
        ),
        tap((user) => this.user$.next(user))
      )
      .subscribe();
  }

  login(): Promise<void> {
    return this.afAuth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
}
