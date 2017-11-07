import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { Stripe } from '@ionic-native/stripe';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {

	loading:any;
	myDate: String = new Date().toISOString();
  patientInfo :any = {};
  cardForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private stripe: Stripe, public formBuilder: FormBuilder, public alertCtrl: AlertController, private storage: Storage, private sqlite: SQLite, public loadingCtrl:LoadingController) {
 	 console.log(JSON.stringify(this.navParams.data));
    this.patientInfo = this.navParams.data;
    console.log(JSON.stringify(this.patientInfo));
    this.cardForm = formBuilder.group({
        cardnumber: ['', Validators.compose([Validators.maxLength(16),Validators.minLength(16), Validators.required])],
        cvv: ['', Validators.compose([Validators.maxLength(3),Validators.minLength(3), Validators.required])],
    });
      this.stripe.setPublishableKey('pk_test_KQSvO27Lt0rCgzn75ZbDBXFm');
  }

 presentLoadingDefault() {
   this.loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  this.loading.present();

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPage');
  }

 alert(message : string){
      this.alertCtrl.create({
      title: 'Payment!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }



  pay(){
    this.presentLoadingDefault();
     this.submitAttempt = true;

      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {

      //create table section
      db.executeSql('CREATE TABLE IF NOT EXISTS appointment(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, mobilePhone INTEGER, date TEXT, time TEXT, patientId INTEGER, doctorId INTEGER)', {})
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));

      //data insert section
         db.executeSql('INSERT INTO appointment(name, email, mobilePhone, date, time, patientId, doctorId) VALUES(?,?,?,?,?,?,?)', [this.patientInfo.name, this.patientInfo.email, this.patientInfo.mobilePhone, this.patientInfo.date, this.patientInfo.time, this.patientInfo.patientId, this.patientInfo.doctorId])
      .then(() => { 
        console.log('Executed SQL : ');
        
        
        
        console.log("sdafdsafss: " + JSON.stringify(this.cardForm.value));
          let  card = {
           number: (this.cardForm.value.cardnumber).toString(),
           expMonth: 12,
           expYear: 2020,
           cvc: (this.cardForm.value.cvv).toString()
          };

            this.stripe.createCardToken(card)
           .then(token =>{ 
             this.alert('Your appinment added successfully!');
             this.navCtrl.popTo( this.navCtrl.getByIndex(1));
             this.loading.dismiss();
              this.cardForm.reset();
           })
           .catch(error =>{ 
             console.error(error)
             this.alert('Your card is incorrect!');
             this.loading.dismiss();
           });

         db.executeSql('select * from appointment', {}).then((data) => {

        console.log("appointment list are :  " + data.rows.item(0).patientId);


        }, (err) => {

        });

      })
      .catch(e => console.log(e));
 

     
      })
      .catch(e => this.alert(JSON.stringify(e)));
    // }


  }

}
