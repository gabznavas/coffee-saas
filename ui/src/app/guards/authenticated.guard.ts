import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const isAuthenticated = userService.isAuthenticated();
  if (!isAuthenticated) {
    router.navigate(['/login'])
    return false
  }
  return true
};
