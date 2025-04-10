import { Component } from '@angular/core';
import { TestFormComponent } from '../test-form/test-form.component';
import { TestTableComponent } from '../test-table/test-table.component';

@Component({
  selector: 'app-test',
  imports: [TestFormComponent,TestTableComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

}
