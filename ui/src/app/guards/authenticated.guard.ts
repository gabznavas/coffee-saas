import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const isAuthenticated = userService.isAuthenticated();
  return isAuthenticated
};
