import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { ProfileComponent } from "src/app/pages/profile/profile.component";
import { SettingsComponent } from "src/app/pages/settings/settings.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "icons", component: IconsComponent },
  { path: "settings", component: SettingsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: ProfileComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
];
