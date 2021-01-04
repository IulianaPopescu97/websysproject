import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SettingsComponent } from "src/app/pages/settings/settings.component";
import { TooltipModule } from "primeng/tooltip";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { GamesComponent } from "src/app/games/games.component";

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
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    MapComponent,
    SettingsComponent,
    GamesComponent
  ]
})
export class AdminLayoutModule {}
