import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { UserTheme } from '../models/userTheme';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  cUser: User = this.authService.GetUser();

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  GetAll(collection: string) {
    this.firestore.collection(collection).get()
    .subscribe((ss) => {
      ss.docs.forEach((doc) => {
        console.log(doc.data());
        return doc.data();
      });
    });
  }

  AddEntry(collection: string) {
    this.firestore.collection(collection).add(
      {uid: this.cUser.uid, sidebarColor: 'blue', theme: 'black-content'} as UserTheme)
  .then(res => {
      console.log(res);
  })
  .catch(e => {
      console.log(e);
  })
  }

  GetEntry(collection: string) {
      this.firestore.collection(collection, ref => ref.where("uid", "==", this.cUser.uid)).get()
        .subscribe(ss => {
          if (ss.docs.length === 0) {
            console.log('Document not found! Try again!');
          } else {
            var arr = [];
            ss.docs.forEach(doc => {
              arr.push(doc.data());
            })
            return arr;
          }
        })
    }

  UpdateEntry(collection: string) {
    const docRef = this.firestore.collection(collection, ref => ref.where("uid", "==", this.cUser.uid));
    docRef.snapshotChanges().forEach((changes) => {
      changes.map((a) => {
        this.firestore.collection(collection).doc(a.payload.doc.id).update({ theme: "testUpdate" });
      });
    });
  }

  DeleteEntry(collection: string) {
    const docRef = this.firestore.collection(collection, ref => ref.where("uid", "==", this.cUser.uid));
    docRef.snapshotChanges().forEach((changes) => {
      changes.map((a) => {
        this.firestore.collection(collection).doc(a.payload.doc.id).delete();
      });
    });
  }

}
