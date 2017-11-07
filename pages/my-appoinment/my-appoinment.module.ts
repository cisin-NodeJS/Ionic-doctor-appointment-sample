import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAppoinmentPage } from './my-appoinment';

@NgModule({
  declarations: [
    MyAppoinmentPage,
  ],
  imports: [
    IonicPageModule.forChild(MyAppoinmentPage),
  ],
})
export class MyAppoinmentPageModule {}
