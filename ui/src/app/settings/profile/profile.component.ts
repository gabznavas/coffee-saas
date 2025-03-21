import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user.type';
import { finalize } from 'rxjs';

@Component({
  selector: 'settings-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  user!: User

  profileImageFile: File | null = null
  isLoading = false

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // TODO: adicionar error, usando o estilo de código tap, onError no final etc...do angular
    this.isLoading = true
    this.userService.getUserLocalStorage()
      .subscribe({
        next: user => this.user = user,
        error: () => {
          this.isLoading = false
        }
      })
  }

  changeImage(event: Event) {
    const inputFile = event.target as HTMLInputElement
    console.log(inputFile.files);
  }

  loadDefaultProfileImageUrl(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/user.png';
  }
}
