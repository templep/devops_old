import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationListItemExpandComponent } from './association-list-item-expand.component';

describe('AssociationListItemExpandComponent', () => {
  let component: AssociationListItemExpandComponent;
  let fixture: ComponentFixture<AssociationListItemExpandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationListItemExpandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationListItemExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
