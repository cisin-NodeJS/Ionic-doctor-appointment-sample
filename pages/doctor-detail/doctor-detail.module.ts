import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorDetailPage } from './doctor-detail';

@NgModule({
  declarations: [
    DoctorDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorDetailPage),
  ],
})
export class DoctorDetailPageModule {}
