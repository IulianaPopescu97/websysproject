import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from "@angular/fire/storage";

import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./pages/verify-email/verify-email.component";
import { ProfileComponent } from './pages/profile/profile.component';

import { AuthService } from "./services/auth.service";

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AccountService } from "./services/account.service";

import { TooltipModule } from 'primeng/tooltip';

import { MatChipsModule } from '@angular/material/chips';

import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { GamesComponent } from './games/games.component';


var firebaseConfig = {
  apiKey: "AIzaSyAF233FV7gag4i9Xz8n1WuuPYhbBk7vGWk",
  authDomain: "web-sys-project.firebaseapp.com",
  databaseURL: "https://web-sys-project-default-rtdb.firebaseio.com",
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

    //Firebase modules
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,

    //PrimeNG modules
    MessagesModule,
    MessageModule,
    TooltipModule,

    //Angular Material modules
    MatChipsModule,
    AutocompleteLibModule,
  ],
  declarations: [AppComponent, AdminLayoutComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent, VerifyEmailComponent, ProfileComponent, GamesComponent],
  providers: [AuthService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule {}
