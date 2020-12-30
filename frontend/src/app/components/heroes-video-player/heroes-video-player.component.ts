import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes-video-player',
  templateUrl: './heroes-video-player.component.html',
  styleUrls: ['./heroes-video-player.component.scss']
})
export class HeroesVideoPlayerComponent implements OnInit {

  playHeroesVideo: boolean = false;

  constructor(private router: Router) {
    router.events.subscribe(x => {
      var cRoute = this.router.url
      if(cRoute.includes('/sign-in') || cRoute.includes('/sign-up') || cRoute.includes('/forgot-password') || cRoute.includes('/email-verification')){
        this.playHeroesVideo = true;
      }
      else
      this.playHeroesVideo = false;
    })
   }

  ngOnInit(): void {
  }

}
