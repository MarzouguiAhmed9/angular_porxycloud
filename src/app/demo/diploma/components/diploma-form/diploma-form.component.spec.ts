import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaFormComponent } from './diploma-form.component';

describe('DiplomaFormComponent', () => {
  let component: DiplomaFormComponent;
  let fixture: ComponentFixture<DiplomaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiplomaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiplomaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
