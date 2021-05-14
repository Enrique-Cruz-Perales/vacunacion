import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcuseDeRegistroPage } from './acuse-de-registro.page';

const routes: Routes = [
  {
    path: '',
    component: AcuseDeRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcuseDeRegistroPageRoutingModule {}
