import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./pages/verify-email/verify-email.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
{ path:  'login', component:  LoginComponent },
{ path:  'register', component:  RegisterComponent },
{ path:  'forgot-password', component:  ForgotPasswordComponent },
{ path:  'verify-email', component:  VerifyEmailComponent },

{ path: '', redirectTo: '/sign-in', pathMatch: 'full' },
{ path: 'sign-in', component: LoginComponent },
{ path: 'sign-up', component: RegisterComponent },
{ path: 'forgot-password', component: ForgotPasswordComponent },
{ path: 'email-verification', component: VerifyEmailComponent },
    {
      path: "",
      redirectTo: "dashboard",
      pathMatch: "full",
      canActivate: [AuthGuard]
    },
    {
      path: "",
      component: AdminLayoutComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: "",
          loadChildren:
            "./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
        }
      ]
    }, {
      path: '',
      component: AuthLayoutComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: '',
          loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
        }
      ]
    },
    {
      path: "**",canActivate: [AuthGuard],
      redirectTo: "dashboard"
    }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
