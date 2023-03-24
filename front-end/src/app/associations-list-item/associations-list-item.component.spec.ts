import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationsListItemComponent } from './associations-list-item.component';

describe('AssociationsListItemComponent', () => {
  let component: AssociationsListItemComponent;
  let fixture: ComponentFixture<AssociationsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationsListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
