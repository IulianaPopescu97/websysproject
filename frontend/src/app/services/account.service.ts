import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import * as admin from 'firebase-admin';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private firestore: AngularFirestore) { }

  // async UpdateProfileImage(userId: string, photoUrl: string) {
  //   admin.auth().updateUser(userId, {
  //   photoURL: photoUrl,
  // })
  // .then((userRecord) => {
  //   // See the UserRecord reference doc for the contents of userRecord.
  //   console.log('Successfully updated user', userRecord.toJSON());
  // })
  // .catch((error) => {
  //   console.log('Error updating user:', error);
  // });
  // }

}
