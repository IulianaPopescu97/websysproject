import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserTheme } from 'src/app/models/userTheme';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/app'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  displayNameDialogue: boolean = false;
  displayEmailDialogue: boolean = false;
  displayEmailUrlDialogue: boolean = false;
  cUser: User;
  public sidebarColor: string = "red";

  constructor(public authService: AuthService, public accountService: AccountService,) {
    // console.log(this.accountService.theme,"settings theme")
    // this.changeDashboardColor(this.accountService.theme.theme);
    // this.changeSidebarColor(this.accountService.theme.sidebarColor);
   }

  ngOnInit(): void {
    this.cUser = this.authService.GetUser();
  }

  updateSidebarColor(color: string) {
    this.accountService.changeSidebarColor(color);
    // this.accountService.UpdateEntry("theme",{sidebarColor: color} as UserTheme)
  }

  updateDashboard(color: string) {
    this.accountService.changeDashboardColor(color);
    // this.accountService.UpdateEntry("theme",{theme: color} as UserTheme)
  }

  updateName(name: string) {
    this.displayNameDialogue = false;
    this.authService.UpdateProfileName(name).then(x => {
      this.cUser = this.authService.GetUser();
      this.authService.UpdateLocalStorageUser(this.cUser);
    });
  }

  updateEmail(email: string, password: string) {
    this.displayEmailDialogue = false;
    this.authService.UpdateProfileEmail(email,password).then(x => {
      this.cUser = this.authService.GetUser();
      this.authService.UpdateLocalStorageUser(this.cUser);
    });
  }

  updateEmailURL(email: string, password: string) {
    this.displayEmailUrlDialogue = false;
    this.authService.UpdateProfileEmail(email,password).then(x => {
      this.cUser = this.authService.GetUser();
      this.authService.UpdateLocalStorageUser(this.cUser);
    });
  }







}
