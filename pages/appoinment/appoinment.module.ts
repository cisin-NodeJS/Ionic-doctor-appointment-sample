import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppoinmentPage } from './appoinment';

@NgModule({
  declarations: [
    AppoinmentPage,
  ],
  imports: [
    IonicPageModule.forChild(AppoinmentPage),
  ],
})
export class AppoinmentPageModule {}
