import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DiplomaFormComponent } from './components/diploma-form/diploma-form.component';
import { DiplomaTableComponent } from './components/diploma-table/diploma-table.component';

@Component({
  selector: 'app-diploma',
  imports: [CommonModule, SharedModule, DiplomaFormComponent, DiplomaTableComponent],
  templateUrl: './diploma.component.html',
  styleUrl: './diploma.component.scss'
})
export class DiplomaComponent {}
