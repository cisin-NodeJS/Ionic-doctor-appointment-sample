import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController, LoadingController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

   myForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl:LoadingController, private sqlite: SQLite, public formBuilder: FormBuilder) {
   this.myForm = formBuilder.group({
        name: ['', Validators.compose([Validators.minLength(3), Validators.required])],
        email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        address: ['', Validators.compose([Validators.required])],
        phone: ['', Validators.compose([Validators.required])]

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }

  alert(message : string){
   this.alertCtrl.create({
      title: 'Register Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

 
Register(){
   this.submitAttempt = true;
   console.log(this.myForm.value);
  if(this.myForm.valid){
         this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {

      //create table section
      db.executeSql('CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT, address TEXT, phone INTEGER)', {})
      .then((data) => {console.log('Executed SQL : '+ JSON.stringify(data))
    })
      .catch(e => console.log(e));
 


      db.executeSql('select * from user where email=?',[this.myForm.value.email]).then((data) => {

        console.log("user list are 1 :  " + JSON.stringify(data.rows.item(0)));
         console.log("user list are 2 :  " + JSON.stringify(data.rows.item));
         console.log("user list are 3 :  " + JSON.stringify(data));

         if(data.rows.item(0) != undefined){
             if(data.rows.item(0).email == this.myForm.value.email){
              this.alert('Email already Exist!');
           }else {
               //data insert section
            db.executeSql('INSERT INTO user(name, email, password, address, phone) VALUES(?,?,?,?,?)', [this.myForm.value.name, this.myForm.value.email, this.myForm.value.password, this.myForm.value.address, this.myForm.value.phone])
          .then((response) => { 

            this.navCtrl.setRoot(HomePage);
            this.storage.set('userId', response.insertId);
            console.log('Executed SQL : ' + response.insertId);
          })
          .catch(e => console.log(e));

           }
         }else {
             //data insert section
            db.executeSql('INSERT INTO user(name, email, password, address, phone) VALUES(?,?,?,?,?)', [this.myForm.value.name, this.myForm.value.email, this.myForm.value.password, this.myForm.value.address, this.myForm.value.phone])
          .then((response) => { 
            this.navCtrl.setRoot(HomePage);
             this.storage.set('userId', response.insertId);
            console.log('Executed SQL : ' + response.insertId);
          })
          .catch(e => console.log(e));
         }




        }, (err) => {
   
        });

     
      })
      .catch(e => this.alert(JSON.stringify(e)));

  }



  	 
  }

}
