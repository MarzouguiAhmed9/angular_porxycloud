import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatTableComponent } from './certificat-table.component';

describe('CertificatTableComponent', () => {
  let component: CertificatTableComponent;
  let fixture: ComponentFixture<CertificatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificatTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
