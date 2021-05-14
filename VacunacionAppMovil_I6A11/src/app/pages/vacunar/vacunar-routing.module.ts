import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacunarPage } from './vacunar.page';

const routes: Routes = [
  {
    path: '',
    component: VacunarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacunarPageRoutingModule {}
