import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResidualCurrentPage } from './residual-current';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    ResidualCurrentPage,
  ],
  imports: [
    IonicPageModule.forChild(ResidualCurrentPage),
    ComponentsModule,
  ],
})
export class ResidualCurrentPageModule {}
