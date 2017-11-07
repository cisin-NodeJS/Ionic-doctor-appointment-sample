import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController, LoadingController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  myForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, private storage: Storage, public formBuilder: FormBuilder, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl:LoadingController, private sqlite: SQLite) {
     this.myForm = formBuilder.group({
        email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }

  alert(message : string){
   this.alertCtrl.create({
      title: 'Login Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

 
  Login(){

    this.submitAttempt = true;
    console.log(this.myForm.value.email);
    if(this.myForm.valid){
        this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
    

   db.executeSql('select * from user where email=?',[this.myForm.value.email]).then((data) => {

            console.log("user 1 :  " + JSON.stringify(data.rows.item(0)));
             console.log("user  2 :  " + JSON.stringify(data.rows.item));
             console.log("user 3 :  " + JSON.stringify(data));

             if(data.rows.item(0) != undefined){
                 if(data.rows.item(0).email == this.myForm.value.email && data.rows.item(0).password == this.myForm.value.password){
                   this.storage.set('userId', data.rows.item(0).id);
                  this.navCtrl.setRoot(HomePage);
               }else {
                 this.alert('Email or password is wrong!');

               }
             }else {
               this.alert('User does not Exist!');
             }

        }, (err) => {
               this.alert('User does not Exist!');
        });
         })
      .catch(e => this.alert(JSON.stringify(e)));
    } else {
    }



  	 
  }

}
