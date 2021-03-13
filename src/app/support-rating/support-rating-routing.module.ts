import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportRatingPage } from './support-rating.page';

const routes: Routes = [
  {
    path: '',
    component: SupportRatingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportRatingPageRoutingModule {}
