import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: string;
  userPassword: string;
  signInButtonDisabled: boolean = false;

  constructor(public  authService:  AuthService) { }

  ngOnInit(): void {
    this.userName = this.userPassword = "";
    this.updateSignInButtonDisabled();
    setTimeout(x => {
      this.updateSignInButtonDisabled()
    },500)
    setTimeout(x => {
      this.updateSignInButtonDisabled()
    },1000)
  }

  ngAfterViewInit() {
    setTimeout(x => {
      this.updateSignInButtonDisabled()
    },500)
    setTimeout(x => {
      this.updateSignInButtonDisabled()
    },1000)
  }

  updateSignInButtonDisabled() {
    this.signInButtonDisabled = (this.userName != "" && this.userName != undefined && this.userPassword != "" && this.userPassword != undefined) ? false : true;
  }

}
