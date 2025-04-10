import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyplanComponent } from './studyplan.component';

describe('StudyplanComponent', () => {
  let component: StudyplanComponent;
  let fixture: ComponentFixture<StudyplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyplanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
