import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IframePagePageRoutingModule } from './iframe-page-routing.module';

import { IframePagePage } from './iframe-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IframePagePageRoutingModule
  ],
  declarations: [IframePagePage]
})
export class IframePagePageModule {}
