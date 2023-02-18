import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationsMembersComponent } from './associations-members.component';

describe('AssociationsMembersComponent', () => {
  let component: AssociationsMembersComponent;
  let fixture: ComponentFixture<AssociationsMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationsMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationsMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
