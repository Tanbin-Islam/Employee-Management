import { Component, OnInit } from "@angular/core";
import { AuthService } from "../login/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"],
})
export class LogoutComponent implements OnInit {
  constructor(private auth: AuthService, protected router: Router) {}

  ngOnInit() {
    this.router.navigate(["/login"]);
    this.auth.setLoggedIn(false);
    localStorage.removeItem("loggedIn");
  }
}
