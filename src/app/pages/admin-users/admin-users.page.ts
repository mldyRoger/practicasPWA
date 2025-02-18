import { Component, OnInit } from '@angular/core';
import { TabService } from '../../services/tab.service';
import { Router, NavigationEnd } from '@angular/router';
import { UsersService } from "../../services/users.service";
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
  standalone: false,
})
export class AdminUsersPage implements OnInit {
  users: any[] = [];
  constructor(public tabService: TabService,
    private router: Router,
  private usersService: UsersService) { 
    this.loadScores()
  }

  ngOnInit() {
    this.loadScores()
  }
  loadScores() {
    this.usersService.getUsers().subscribe((data) => {
      console.log(data)
      this.users = data.users; 
      console.log(this.users)
    })
  }
  goToHomePage() {
    this.tabService.selectedTab = 'home';
    this.router.navigate(['/home']);
  }

  goToAdminAddUserPage() {
    this.tabService.selectedTab = 'add-user';
    this.router.navigate(['/admin-users-add']);
  }

  goToAdminUpdateUserPage() {
    this.tabService.selectedTab = 'update-user';
    this.router.navigate(['/admin-users-update']);
  }
}
