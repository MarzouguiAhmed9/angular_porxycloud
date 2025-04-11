import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatFormComponent } from './certificat-form.component';

describe('CertificatFormComponent', () => {
  let component: CertificatFormComponent;
  let fixture: ComponentFixture<CertificatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificatFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
