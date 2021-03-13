import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IframePagePage } from './iframe-page.page';

const routes: Routes = [
  {
    path: '',
    component: IframePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IframePagePageRoutingModule {}
