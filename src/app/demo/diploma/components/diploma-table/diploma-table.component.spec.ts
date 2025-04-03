import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaTableComponent } from './diploma-table.component';

describe('DiplomaTableComponent', () => {
  let component: DiplomaTableComponent;
  let fixture: ComponentFixture<DiplomaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiplomaTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiplomaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
