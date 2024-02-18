import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('auth guard')
  const router = inject(Router)
  return router.createUrlTree(['auth', 'login']);
};
