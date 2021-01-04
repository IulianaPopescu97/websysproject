import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/app'
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { User } from '../models/user';
// import firebase from 'firebase'
// require('firebase/auth')
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
          this.userState = user;
          localStorage.setItem('user', JSON.stringify(this.userState));
          JSON.parse(localStorage.getItem('user'));
          if(this.navigateToDashboard) this.router.navigate(['dashboard']);
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
        this.SetUserData(result.user);
        console.log(result);
        this.ngZone.run(() => {
          if(this.navigateToDashboard) this.router.navigate(['dashboard']);
        });
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
        this.showPrimengMessage('info','Email verification', 'Email verification has been sent to you');
      })
      .catch((error) => {
        this.showPrimengMessage('error','Error', error.message);
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
    return (await this.afAuth.currentUser).updateProfile(profile)
    .then(() => {this.showPrimengMessage('info','Profile Image', 'Your profile image url has been updated to ' + profile.photoURL + '!')})
    .catch((error) => {
      this.showPrimengMessage('error','Error', error.message);
    });;
  }

  async UpdateProfileName(name: string) {
    const profile = {
      displayName: name
    }
    return (await this.afAuth.currentUser).updateProfile(profile)
    .then(() => {this.showPrimengMessage('info','Display name update', 'Your displayed name has been updated to ' + profile.displayName + '!')})
    .catch((error) => {
      this.showPrimengMessage('error','Error', error.message);
    });
  }

  async UpdateProfilePassword(cPassword: string, nPassword: string) {
    firebase.auth()
    .signInWithEmailAndPassword(this.GetUser().email, cPassword)
    .then(function(userCredential) {
        userCredential.user.updatePassword(nPassword).then(x=> {

          this.showPrimengMessage('info','Password update', 'Your password has been updated!')
        })
    })
    .catch((error) => {
      console.log('err',error)
      this.showPrimengMessage('error','Error', error.message);
    });
  }

  async UpdateProfileEmail(email: string, password: string) {
    firebase.auth()
    .signInWithEmailAndPassword(this.GetUser().email, password)
    .then(function(userCredential) {
        userCredential.user.updateEmail(email).then(() => {this.showPrimengMessage('info','E-mail update', 'Your email has been updated to ' + email + '!')})
    })
    .catch((error) => {
      this.showPrimengMessage('error','Error', error.message);
    });
  }

  async UpdateProfilePhotoUrl(url: string) {
    const profile = {
      photoURL: url
    }
    return (await this.afAuth.currentUser).updateProfile(profile)
    .then(() => {this.showPrimengMessage('info','E-mail update', 'Your Photo URL has been updated to ' + profile.photoURL + '!')})
    .catch((error) => {
    console.log('err',error)
    this.showPrimengMessage('error','Error', error.message);
    });;
  }

  GetUser(): User {
    return firebase.auth().currentUser ? firebase.auth().currentUser : this.userState ? this.userState : JSON.parse(localStorage.getItem('user')) as User;
  }

  UpdateLocalStorageUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user))
  }


}

