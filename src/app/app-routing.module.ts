import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './modules/login/components/login-page/login-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  // { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] }, // Protect home page
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home if logged in
  { path: '**', redirectTo: '/login' }, // Redirect unknown routes to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
