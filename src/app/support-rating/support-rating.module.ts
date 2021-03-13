import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportRatingPageRoutingModule } from './support-rating-routing.module';

import { SupportRatingPage } from './support-rating.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportRatingPageRoutingModule
  ],
  declarations: [SupportRatingPage]
})
export class SupportRatingPageModule {}
