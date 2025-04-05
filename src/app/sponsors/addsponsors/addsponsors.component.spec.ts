import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsponsorsComponent } from './addsponsors.component';

describe('AddsponsorsComponent', () => {
  let component: AddsponsorsComponent;
  let fixture: ComponentFixture<AddsponsorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddsponsorsComponent]
    });
    fixture = TestBed.createComponent(AddsponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
