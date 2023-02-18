import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationsMinutesComponent } from './associations-minutes.component';

describe('AssociationsMinutesComponent', () => {
  let component: AssociationsMinutesComponent;
  let fixture: ComponentFixture<AssociationsMinutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationsMinutesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationsMinutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
