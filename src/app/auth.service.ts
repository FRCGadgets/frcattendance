import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs/RX';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

interface Item { team: string; uid: string; }

@Injectable()
export class AuthService implements CanActivate {
  user: Observable<firebase.User>;
  afs: AngularFirestore;
  constructor(private firebaseAuth: AngularFireAuth, private anfs: AngularFirestore) {
    this.user = firebaseAuth.authState;
    this.afs = anfs;
  }

  canActivate(): Observable<boolean> {
    return Observable.from(this.firebaseAuth)
      .take(1)
      .map(state => !!state)
      .do(authenticated => {
    if (!authenticated) this.router.navigate([ '/login' ]);
    });
  }

  signup(email: string, password: string, team: string) {
    this.afs.collection<Item>('teams', ref => ref.where('team', '==', team)).valueChanges().subscribe(data => {
      if (data.length < 1) {
        this.firebaseAuth
        .auth
        .createUserWithEmailAndPassword(email, password)
        .then(value => {
          console.log('Success!', value.uid);
          this.afs.collection<Item>('teams').add({team, uid: value.uid});
        })
        .catch(err => {
          console.log('Something went wrong:', err.message);
        });
      }
    });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }
}
