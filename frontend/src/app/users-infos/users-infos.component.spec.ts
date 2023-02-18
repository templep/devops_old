import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersInfosComponent } from './users-infos.component';

describe('UsersInfosComponent', () => {
  let component: UsersInfosComponent;
  let fixture: ComponentFixture<UsersInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersInfosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
