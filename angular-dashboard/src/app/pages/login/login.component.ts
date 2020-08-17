import { Component, OnInit } from '@angular/core';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { Router } from '@angular/router';
import { User, Device } from '../../data/db.interfaces';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { isFunction } from 'util';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  providers = AuthProvider;
  userRef : AngularFirestoreDocument<User>;
  user$: Observable<User>;
  device$: Observable<Device>;

  test = {testParam: ''};

  constructor(
    private router: Router, 
    private afs: AngularFirestore) { }

  ngOnInit(): void {
  }

  loginSuccess($event){
    console.log($event);
    this.userRef = this.afs.collection('users').doc<User>($event.uid);
    console.log(this.userRef);

    this.userRef.get().subscribe(x => {
      var data : User = x.data();
      console.log(data);
      if(data.testParam == undefined)
        this.test.testParam = 'UNDEFINED';
      else
        this.test.testParam = 'DEFINED';
      this.userRef.set(this.test, {merge: true});
    });

     /**Need to check this data with the database before pushign to the homepage */
    this.router.navigate(['/home']);
    

  }

}
