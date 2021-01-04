import { Routes } from "@angular/router";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { ProfileComponent } from "src/app/pages/profile/profile.component";
import { SettingsComponent } from "src/app/pages/settings/settings.component";
import { GamesComponent } from "src/app/games/games.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "icons", component: IconsComponent },
  { path: "settings", component: SettingsComponent },
  { path: "games", component: GamesComponent },
  { path: "user", component: ProfileComponent },
  { path: "tables", component: TablesComponent },
];
