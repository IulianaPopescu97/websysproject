import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeroesVideoPlayerComponent } from './heroes-video-player/heroes-video-player.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, HeroesVideoPlayerComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, HeroesVideoPlayerComponent]
})
export class ComponentsModule {}
