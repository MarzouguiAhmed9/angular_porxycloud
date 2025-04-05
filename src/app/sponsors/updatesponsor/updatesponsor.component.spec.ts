import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesponsorComponent } from './updatesponsor.component';

describe('UpdatesponsorComponent', () => {
  let component: UpdatesponsorComponent;
  let fixture: ComponentFixture<UpdatesponsorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatesponsorComponent]
    });
    fixture = TestBed.createComponent(UpdatesponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
