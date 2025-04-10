import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectTestCoursComponent } from './affect-test-cours.component';

describe('AffectTestCoursComponent', () => {
  let component: AffectTestCoursComponent;
  let fixture: ComponentFixture<AffectTestCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffectTestCoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectTestCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
