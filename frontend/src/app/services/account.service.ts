import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private firestore: AngularFirestore) { }

  getPhoto() {
    return this.firestore.collection('photos').snapshotChanges();
  }

  addPhoto(photo: String){
    return this.firestore.collection('photos').add(photo);
  }

  updatePhoto(photo: String){
    delete photo.id;
    this.firestore.doc('photos/' + photo.id).update(photo);
  }

  deletePhoto(photoId: string){
    this.firestore.doc('photos/' + photoId).delete();
 }

}
