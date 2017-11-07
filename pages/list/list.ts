import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DoctorService} from '../../providers/broker-service-mock';
import {DoctorDetailPage} from '../doctor-detail/doctor-detail';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

   mockData: Array<any>;
   items:Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: DoctorService, private sqlite: SQLite) {

    service.findAll().then(data => this.mockData = data);
  }

  ngOnInit() { }

   ionViewDidLoad() {


      
    console.log('ionViewDidLoad AppoinmentPage');
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {

      //create table section
      // id INTEGER PRIMARY KEY AUTOINCREMENT
      db.executeSql('CREATE TABLE IF NOT EXISTS doctorList(id INTEGER PRIMARY KEY, name TEXT, title TEXT, phone TEXT, mobilePhone TEXT, education TEXT, picture TEXT)', {})
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));

      //data insert section
      for(let i=0;i< this.mockData.length;i++){
         db.executeSql('INSERT INTO doctorList(id, name, title, phone, mobilePhone, education, picture) VALUES(?,?,?,?,?,?,?)', [this.mockData[i].id, this.mockData[i].name, this.mockData[i].title, this.mockData[i].phone, this.mockData[i].mobilePhone, this.mockData[i].education, this.mockData[i].picture])
      .then(() => console.log('Executed SQL : ', i))
      .catch(e => console.log(e));
      }


      db.executeSql('select * from doctorList', {}).then((data) => {

        console.log("Doctor list are :  " + JSON.stringify(data));


        this.items = [];
        if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
        this.items.push({id: data.rows.item(i).id, name: data.rows.item(i).name, title: data.rows.item(i).title, phone: data.rows.item(i).phone, mobilePhone: data.rows.item(i).mobilePhone, education: data.rows.item(i).education, picture: data.rows.item(i).picture});
        }
        }

        }, (err) => {
        });

     
      })
      .catch(e => console.log(JSON.stringify(e)));
  }



  openDoctorDetails(doctor) {

   this.navCtrl.push(DoctorDetailPage, doctor);
  }
}
