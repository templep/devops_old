import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssociationComponent } from './edit-association.component';

describe('EditAssociationComponent', () => {
  let component: EditAssociationComponent;
  let fixture: ComponentFixture<EditAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAssociationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
