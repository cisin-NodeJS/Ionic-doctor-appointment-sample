import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AppoinmentPage} from '../appoinment/appoinment';

@IonicPage()
@Component({
  selector: 'page-doctor-detail',
  templateUrl: 'doctor-detail.html',
})
export class DoctorDetailPage {
	doctor: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	 this.doctor = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorDetailPage');
  }

  bookAppointment(){
  	this.navCtrl.push(AppoinmentPage, this.doctor);
  }

}
