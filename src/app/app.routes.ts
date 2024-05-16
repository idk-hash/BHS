import { CanActivateFn, CanMatchFn, Router, Routes, UrlSegment, UrlTree } from '@angular/router';
import { Platform } from '@ionic/angular';
import { inject } from '@angular/core';

const isDesktopGuard : CanMatchFn = () => {return inject(Platform).is("desktop") || inject(Platform).is("mobileweb");};
const isMobileGuard : CanMatchFn = () => {return inject(Platform).is("mobile");};
const isRegisteredGuard : CanMatchFn = () => {return true;};
const isLoggedGuard : CanMatchFn = () => {return true;};

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  // {
  //   path: 'home',
  //   loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage),
  //   canMatch: [isDesktopGuard],
  // },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    //canMatch: [isMobileGuard, isLoggedGuard],
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage),
    canMatch: [isMobileGuard, isRegisteredGuard],
  },
  {
    path: 'message/:id',
    loadComponent: () => import('./view-message/view-message.page').then((m) => m.ViewMessagePage),
    canMatch: [isMobileGuard],
  },

];

