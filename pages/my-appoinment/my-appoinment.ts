import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@IonicPage()
@Component({
  selector: 'page-my-appoinment',
  templateUrl: 'my-appoinment.html',
})
export class MyAppoinmentPage {
	items:Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad MyAppoinmentPage');
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {


      db.executeSql('select * from appointment', {}).then((data) => {

        console.log("appointment list are :  " + JSON.stringify(data));

        this.items = [];
        let appoinementData = data;
        if(data.rows.length > 0) {
          console.log( 'appoinementData.rows.item(i).patientId  :  ' +  appoinementData.rows.item(0).patientId);
        for(let i = 0; i < data.rows.length; i++) {
		        
		        db.executeSql('select * from doctorList where id=?',[appoinementData.rows.item(i).doctorId]).then((doctorData) => {

		        console.log("doctorList list are :  " + doctorData.rows.item(0).name);

            console.log( 'appoinementData.rows.item(i).patientId  ***** :  ' +  appoinementData.rows.item(0).patientId);

    this.items.push({id: appoinementData.rows.item(i).id, name: appoinementData.rows.item(i).name, email: appoinementData.rows.item(i).email, mobilePhone: appoinementData.rows.item(i).mobilePhone, date: appoinementData.rows.item(i).date, time: appoinementData.rows.item(i).time, doctorName : doctorData.rows.item(0).name, patientName : appoinementData.rows.item(i).name });

		        }, (err) => {
		        console.log('Unable to execute sql: '+ JSON.stringify(err));
		        });

        	}
        }

        }, (err) => {
        console.log('Unable to execute sql: '+ JSON.stringify(err));
        });

     
      })
      .catch(e => console.log(JSON.stringify(e)));
  }

}
