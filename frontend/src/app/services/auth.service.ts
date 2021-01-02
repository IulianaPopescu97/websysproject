import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/app'
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private showPrimengMessage: (severity: string, summary: string, detail: string) => void;
  showMessage(fn: (severity: string, summary: string, detail: string) => void) {
    this.showPrimengMessage = fn;
  }
  user: User;
  userState: any;
  navigateToDashboard: boolean = true;

  constructor( public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,) {

      this.afAuth.authState.subscribe(user => {
        if (user) {
          if(this.navigateToDashboard) this.router.navigate(['dashboard']);
          this.userState = user;
          localStorage.setItem('user', JSON.stringify(this.userState));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })

      router.events.subscribe(x => {
        var cRoute = this.router.url
        if(cRoute.includes('/sign-in') || cRoute.includes('/sign-up') || cRoute.includes('/forgot-password') || cRoute.includes('/email-verification')){
          this.navigateToDashboard = true;
        }
        else
        this.navigateToDashboard = false;
      })
   }

   SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        this.ngZone.run(() => {
          if(this.navigateToDashboard) this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        this.showPrimengMessage('error','Error', error.message);
      })
  }

  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        this.showPrimengMessage('error','Error', error.message);
      })
  }

  SendVerificationMail() {
      return this.afAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['email-verification']);
      })
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      this.showPrimengMessage('info','Password reset', 'Password reset email sent, check your inbox.');
    }).catch((error) => {
      this.showPrimengMessage('error','Error', error.message);
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      this.showPrimengMessage('error','Error', error.message);
    })
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userState: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userState, {
      merge: true
    })
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

  async UpdateProfileImg(photoURL: string) {
    const profile = {
        photoURL: photoURL
    }
    return (await this.afAuth.currentUser).updateProfile(profile);
}

  GetUser(): User {
    return firebase.auth().currentUser ? firebase.auth().currentUser : this.userState ? this.userState : JSON.parse(localStorage.getItem('user')) as User;
  }


}

