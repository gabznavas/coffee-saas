import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'menu-right',
  templateUrl: './menu-right.component.html',
  styleUrl: './menu-right.component.scss'
})
export class MenuRightComponent implements OnInit, OnDestroy {

  showMenuItems = false
  private userSubscribe!: Subscription

  employee = {
    fullName: '',
    imageProfileUrl: '',
    role: '',
  }

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userSubscribe = this.userService.observableUser()
      .subscribe(user => {
        this.employee.imageProfileUrl = user.profileImageUrl
        this.employee.fullName = user.fullName
      })

    this.userService.getUserLogged()
      .subscribe({
        next: user => {
          this.employee = {
            fullName: user.fullName,
            imageProfileUrl: user.profileImageUrl,
            role: user.rankedRoles().translate(),
          }
        }
      })
  }

  ngOnDestroy(): void {
    this.userSubscribe.unsubscribe();
  }

  toggleShowMenuItems(): void {
    this.showMenuItems = !this.showMenuItems
  }

  goToSettings() {
    this.toggleShowMenuItems();
    this.router.navigate(['/settings'])
  }

  loadDefaultProfileImageUrl(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/user.png';
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login'])
    this.showMenuItems = false;
  }
}
