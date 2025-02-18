import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminUsersAddPage } from './admin-users-add.page';

describe('AdminUsersAddPage', () => {
  let component: AdminUsersAddPage;
  let fixture: ComponentFixture<AdminUsersAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
