import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

	userId:number;
	name:string;
	email:string;
	address:string;
	phone:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public alertCtrl: AlertController, private sqlite: SQLite,) {
  }

  ionViewDidLoad() {

  this.storage.get('userId').then((val) => {
    
     this.userId = val;

      console.log('Your Userid is: ', this.userId);


        this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
      	console.log(this.userId);
   db.executeSql('select * from user where id=?',[this.userId]).then((data) => {

            console.log("user 1 :  " + JSON.stringify(data.rows.item(0)));
             // console.log("user  2 :  " + JSON.stringify(data.rows.item));
             console.log("user 3 :  " + JSON.stringify(data));
             if(data.rows.item(0) != undefined){

                   this.name = data.rows.item(0).name;
                   this.email = data.rows.item(0).email;
                   this.address = data.rows.item(0).address;
                   this.phone = data.rows.item(0).phone;
 
             }else {
               this.alert('User does not Exist!');
             }

        }, (err) => {
               this.alert('User does not Exist!');
        });
         })
      .catch(e => this.alert(JSON.stringify(e)));

    });

  	
    console.log('ionViewDidLoad ProfilePage');
  }

  alert(message : string){
   this.alertCtrl.create({
      title: 'Profile Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }


}
