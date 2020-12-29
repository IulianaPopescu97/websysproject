import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [MessageService]
})
export class AppComponent {

  s: AuthService;
  title = "black-dashboard-angular";

  constructor(private messageService: MessageService, authService: AuthService) {
    this.s = authService;
   }

  ngOnInit() {
    this.s.showMessage(this.showViaService.bind(this));
  }
  showViaService(severity: string, summary: string, detail: string) {
    this.messageService.add({severity: severity, summary: summary, detail: detail});
}
}

