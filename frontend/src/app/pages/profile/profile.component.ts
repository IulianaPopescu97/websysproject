import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { ipInfo } from 'src/app/models/ipinfo';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { map, finalize } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  fb: string;
  cUser: User;
  selectedFile: File = null;
  public ipData: ipInfo;
  downloadURL: Observable<string>;

  constructor( public http: HttpClient, private authService: AuthService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.cUser = this.authService.GetUser();
    console.log(this.cUser,'cUser');
    if(this.cUser && this.cUser.photoURL)
    this.fb = this.cUser.photoURL;
    else
    this.fb = '../../assets/img/anime3.png';

    this.SetIpAddress();
  }

  onFileSelected(event) {
    this.fb = '../../assets/img/loading.gif'
    var n = Date.now();
    const file = <File>event.target.files[0];
    const filePath = `ProfileImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.authService.UpdateProfileImg(url).then(x => {
                this.fb = url;
              });

            }
            console.log(this.fb,'fb');
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  SetIpAddress() {
    this.http.get(environment.Ip_Info_Url + environment.Ip_Info_Key).subscribe(data => {
      this.ipData = data as ipInfo;
    });
  }

}
