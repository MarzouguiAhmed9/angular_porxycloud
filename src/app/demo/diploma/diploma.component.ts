import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-diploma',
  imports: [CommonModule, SharedModule],
  templateUrl: './diploma.component.html',
  styleUrl: './diploma.component.scss'
})
export class DiplomaComponent {

}
