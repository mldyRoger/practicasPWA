import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminUsersUpdatePage } from './admin-users-update.page';

describe('AdminUsersUpdatePage', () => {
  let component: AdminUsersUpdatePage;
  let fixture: ComponentFixture<AdminUsersUpdatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
