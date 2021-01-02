import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userEmail: string = "";
  userPwd: string = "";
  userPwd2: string = "";

  signUpButtonDisabled: boolean = true;
  signUpPtooltip: string ="";

  constructor(public  authService:  AuthService) { }

  ngOnInit(): void {
    this.updateSignUpButtonDisabled()
    setTimeout(x => {this.updateSignUpButtonDisabled()}, 500)
  }

  updateSignUpButtonDisabled() {
    this.signUpButtonDisabled = (this.userEmail != "" && this.userEmail != undefined && this.userPwd != "" &&
      this.userPwd != undefined && this.userPwd2 != "" && this.userPwd2 != undefined && this.userPwd == this.userPwd2) ? false : true;
    if(this.signUpButtonDisabled) {
      if(this.userPwd != this.userPwd2)
      this.signUpPtooltip = "Please make sure that the Password and Password confimation fields match!";
      else
      this.signUpPtooltip = "Please make sure that all fields have been completed properly.";
    }
    else
      this.signUpPtooltip = "Register a free account with us! :D"
  }

}
