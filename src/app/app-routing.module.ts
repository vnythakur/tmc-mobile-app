import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

// import { map } from 'rxjs/operators';

// import { environment } from  '../environments/environment';

// const redirectToProfileEditOrLogin = () => map((user: any) => user ? (user.email === environment.admin ? ['admin'] : ['home']) : ['login']);

// const redirectTo = (user, path) => !user ? [path] : (user.email === environment.admin ? ['admin'] : ['home']);

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), 
    canActivate: [ AngularFireAuthGuard ], data: { authGuardPipe: () => redirectUnauthorizedTo(['/login']) } 
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule), 
    canActivate: [ AngularFireAuthGuard ], data: { authGuardPipe: () => redirectLoggedInTo(['/home']) }
    // ...canActivate(() => map((user: any) => user ? (user.email === environment.admin ? ['admin'] : ['home']) : ['login']))
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule),
    canActivate: [ AngularFireAuthGuard ], data: { authGuardPipe: () => redirectLoggedInTo(['/home']) }
    // ...canActivate(() => map((user: any) => user ? (user.email === environment.admin ? ['admin'] : ['home']) : ['welcome']))
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule),
    canActivate: [ AngularFireAuthGuard ], data: { authGuardPipe: () => redirectLoggedInTo(['/home']) }
    // ...canActivate(() => map((user: any) => user ? (user.email === environment.admin ? ['admin'] : ['home']) : ['login']))
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then( m => m.ContactsPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
  },
  {
    path: 'support-rating',
    loadChildren: () => import('./support-rating/support-rating.module').then( m => m.SupportRatingPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'iframe-page/:id',
    loadChildren: () => import('./iframe-page/iframe-page.module').then( m => m.IframePagePageModule)
  },
  {
    path: 'user-detail',
    loadChildren: () => import('./user-detail/user-detail.module').then( m => m.UserDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
