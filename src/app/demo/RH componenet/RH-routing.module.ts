import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { OffreComponent } from "./offre/offre/offre.component";

const routes: Routes = [
  {
    path: 'application',  // Path for ApplicationComponent
    component: ApplicationComponent
  },
  {
    path: 'offre',  // Path for ApplicationComponent
    component: OffreComponent
  },
  // Add other routes for this module as needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RHRoutingModule {}
