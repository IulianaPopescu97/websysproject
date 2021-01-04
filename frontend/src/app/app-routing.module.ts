import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./pages/verify-email/verify-email.component";
import { AuthGuard } from "./auth/guards/auth.guard";
import { ProfileComponent } from "./pages/profile/profile.component";

const routes: Routes = [
{ path: '', redirectTo: 'sign-in', pathMatch: 'full' },
{ path: 'sign-in', component: LoginComponent },
{ path: 'sign-up', component: RegisterComponent },
{ path: 'forgot-password', component: ForgotPasswordComponent },
{ path: 'email-verification', component: VerifyEmailComponent },
{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
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
