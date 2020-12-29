import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./pages/verify-email/verify-email.component";
import { AuthService } from "./services/auth.service";

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';


var firebaseConfig = {
  apiKey: "AIzaSyAF233FV7gag4i9Xz8n1WuuPYhbBk7vGWk",
  authDomain: "web-sys-project.firebaseapp.com",
  projectId: "web-sys-project",
  storageBucket: "web-sys-project.appspot.com",
  messagingSenderId: "521629972601",
  appId: "1:521629972601:web:57ef5f4c5924514054bca8",
  measurementId: "G-1C4BDT0NNB"
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MessagesModule,
    MessageModule
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent, VerifyEmailComponent],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
