import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroSinDocumentosPage } from './registro-sin-documentos.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroSinDocumentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroSinDocumentosPageRoutingModule {}
