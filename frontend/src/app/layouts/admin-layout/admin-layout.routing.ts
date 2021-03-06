import { Routes } from "@angular/router";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { ProfileComponent } from "src/app/pages/profile/profile.component";
import { SettingsComponent } from "src/app/pages/settings/settings.component";
import { GamesComponent } from "src/app/components/games/games.component";
import { MapComponent } from "src/app/pages/map/map.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "settings", component: SettingsComponent },
  { path: "games", component: GamesComponent },
  { path: "map", component: MapComponent },
  { path: "user", component: ProfileComponent },
];
