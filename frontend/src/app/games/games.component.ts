import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { MarvelApiService } from '../services/marvel-api.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  cUser: User;
  constructor(private marvelApi: MarvelApiService, private authService: AuthService) { }

  ngOnInit(): void {
    // this.marvelApi.getAllCharacters().subscribe(x => {
    //   console.log(x);
    // })
    this.cUser = this.authService.GetUser();
  }

}
