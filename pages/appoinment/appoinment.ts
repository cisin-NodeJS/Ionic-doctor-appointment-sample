import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { CardPage } from '../card/card';


@IonicPage()
@Component({
  selector: 'page-appoinment',
  templateUrl: 'appoinment.html',
})
export class AppoinmentPage {
  doctor: any;
  myDate: String = new Date().toISOString();

  patientId:number;
  doctorId:number;
  appoinmentForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private storage: Storage, public formBuilder: FormBuilder, public navParams: NavParams, private sqlite: SQLite) {
     this.doctor = this.navParams.data;
     this.doctorId = this.doctor.id;
     console.log('doctor details : ' + JSON.stringify(this.doctor));
      this.appoinmentForm = formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30),Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
        mobilePhone: ['', Validators.compose([Validators.maxLength(10),Validators.minLength(10), Validators.required])],
        time: ['', Validators.compose([Validators.required])],
    });
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppoinmentPage');
    this.storage.get('userId').then((val) => {
    
     this.patientId = parseInt(val);
      console.log('Your Userid is: ', this.patientId);
    });
  }

    alert(message : string){
      this.alertCtrl.create({
      title: 'Login Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }


  book(){
   

    this.submitAttempt = true;
    
    console.log(this.appoinmentForm.value);
    if(this.appoinmentForm.valid){
        let  patientInfo = {
         name: this.appoinmentForm.value.name,
         email: this.appoinmentForm.value.email,
         mobilePhone: this.appoinmentForm.value.mobilePhone,
         date: this.myDate,
         time:this.appoinmentForm.value.time,
         patientId:this.patientId,
         doctorId:this.doctorId
        };
         this.navCtrl.push(CardPage, patientInfo);

    }


  }

}
