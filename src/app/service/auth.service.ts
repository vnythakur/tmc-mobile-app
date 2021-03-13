import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore,
  ) {
      
  }

  get authState$() {
    return this.afAuth.authState;
  }

  login(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut();
  }

  signUpWithEmail(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  addUser(obj) {
    return this.firestore
        .collection('users')
        .doc(`/${obj.uid}`)
        .set(obj);
  }

  getAllUsers(): AngularFirestoreCollection<any> {
    return this.firestore.collection('users');
  }

  getUser(uid: string){
    return this.firestore.doc(`users/${uid}`).valueChanges();
  }
}
