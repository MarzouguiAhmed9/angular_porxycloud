import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectCertificatCoursComponent } from './affect-certificat-cours.component';

describe('AffectCertificatCoursComponent', () => {
  let component: AffectCertificatCoursComponent;
  let fixture: ComponentFixture<AffectCertificatCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffectCertificatCoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectCertificatCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
