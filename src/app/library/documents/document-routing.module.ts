import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentAddComponent } from './document-add/document-add.component';
import { DocumentListComponent } from './document-list/document-list.component';

const routes: Routes = [
  { path: 'add', component: DocumentAddComponent },
  { path: 'list', component: DocumentListComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
