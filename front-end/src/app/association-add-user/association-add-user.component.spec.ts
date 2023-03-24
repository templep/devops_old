import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationAddUserComponent } from './association-add-user.component';

describe('AssociationAddUserComponent', () => {
  let component: AssociationAddUserComponent;
  let fixture: ComponentFixture<AssociationAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationAddUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
