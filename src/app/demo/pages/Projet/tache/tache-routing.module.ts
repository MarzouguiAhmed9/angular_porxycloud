import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'tache',
        loadComponent: () => import('./tache.component')
      }
]}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TacheRoutingModule { }
