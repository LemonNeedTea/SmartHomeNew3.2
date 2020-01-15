import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EleCostPage } from './ele-cost';

@NgModule({
  declarations: [
    EleCostPage,
  ],
  imports: [
    IonicPageModule.forChild(EleCostPage),
  ],
})
export class EleCostPageModule {}
