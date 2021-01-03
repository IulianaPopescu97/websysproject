import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserTheme } from '../models/userTheme';
import { AuthService } from './auth.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) {
   }

  public theme: UserTheme = {sidebarColor: 'red', theme: 'black-content'} as UserTheme;
  public sidebarColor: string = this.theme.sidebarColor;

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
      {uid: this.authService.GetUser().uid, sidebarColor: 'red', theme: 'black-content'} as UserTheme)
  .then(res => {
      //apply theme preference after adding it
      this.changeSidebarColor('red');
      this.changeDashboardColor('black-content');
      console.log(res);
  })
  .catch(e => {
      console.log(e);
  })
  }

  GetEntry(collection: string) {
    let arr = [];
      this.firestore.collection(collection, ref => ref.where("uid", "==", this.authService.GetUser().uid)).get()
        .subscribe(ss => {
          if (ss.docs.length === 0) {
            console.log('Document not found! ... adding default preferences');
            this.AddEntry("theme")
          } else {
            ss.docs.forEach(doc => {
              arr.push(doc.data());
            })
            this.theme = arr[arr.length-1];
            this.changeSidebarColor(this.theme.sidebarColor);
            this.changeDashboardColor(this.theme.theme);
            console.log(this.theme,"theme inside getEntry")
            console.log(arr,"user theme")
          }
        })
    }

  UpdateEntry(collection: string, userTheme: UserTheme) {
    const docRef = this.firestore.collection(collection, ref => ref.where("uid", "==", this.authService.GetUser().uid));
    docRef.snapshotChanges().forEach((changes) => {
      changes.map((a) => {
        this.firestore.collection(collection).doc(a.payload.doc.id).update(userTheme).then(x => {
          if(userTheme.sidebarColor)
          this.changeSidebarColor(userTheme.sidebarColor);
          if(userTheme.theme)
          this.changeDashboardColor(userTheme.theme);
        });
      });
    });
  }

  DeleteEntry(collection: string) {
    const docRef = this.firestore.collection(collection, ref => ref.where("uid", "==", this.authService.GetUser().uid));
    docRef.snapshotChanges().forEach((changes) => {
      changes.map((a) => {
        this.firestore.collection(collection).doc(a.payload.doc.id).delete();
      });
    });
  }

  changeSidebarColor(color){
    // this.accountService.UpdateEntry("theme",{sidebarColor: color} as UserTheme);
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var mainPanel = document.getElementsByClassName('main-panel')[0];

    this.sidebarColor = color;

    if(sidebar != undefined){
        sidebar.setAttribute('data',color);
    }
    if(mainPanel != undefined){
        mainPanel.setAttribute('data',color);
    }
  }

  changeDashboardColor(color){
    // this.accountService.UpdateEntry("theme",{theme: color} as UserTheme);
    var body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {
        body.classList.add(color);
    }
    else if(body.classList.contains('white-content')) {
      body.classList.remove('white-content');
    }
  }

}
