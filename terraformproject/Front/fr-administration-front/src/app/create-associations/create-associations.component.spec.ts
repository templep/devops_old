import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssociationsComponent } from './create-associations.component';

describe('CreateAssociationsComponent', () => {
  let component: CreateAssociationsComponent;
  let fixture: ComponentFixture<CreateAssociationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAssociationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAssociationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
