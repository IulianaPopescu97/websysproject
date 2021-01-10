import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TypographyComponent } from "../../pages/typography/typography.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SettingsComponent } from "src/app/pages/settings/settings.component";
import { TooltipModule } from "primeng/tooltip";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { GamesComponent } from "src/app/components/games/games.component";
import { DisplayGameCardComponent } from "src/app/components/display-game-card/display-game-card.component";
import { GridComponent } from "src/app/components/TicTacToe/grid/grid.component";
import { SquareComponent } from "src/app/components/TicTacToe/square/square.component";
import { ProfileComponent } from "src/app/pages/profile/profile.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    TooltipModule,
    DialogModule,
    ButtonModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TypographyComponent,
    NotificationsComponent,
    MapComponent,
    SettingsComponent,
    GamesComponent,
    DisplayGameCardComponent,
    GridComponent,
    SquareComponent,
    ProfileComponent,
  ]
})
export class AdminLayoutModule {}
