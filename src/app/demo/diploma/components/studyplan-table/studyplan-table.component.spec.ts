import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyplanTableComponent } from './studyplan-table.component';

describe('StudyplanTableComponent', () => {
  let component: StudyplanTableComponent;
  let fixture: ComponentFixture<StudyplanTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyplanTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyplanTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
