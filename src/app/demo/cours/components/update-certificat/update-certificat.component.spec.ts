import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCertificatComponent } from './update-certificat.component';

describe('UpdateCertificatComponent', () => {
  let component: UpdateCertificatComponent;
  let fixture: ComponentFixture<UpdateCertificatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCertificatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCertificatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
