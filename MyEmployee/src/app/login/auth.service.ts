import { Injectable } from "@angular/core";
import { Login } from "./login";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface login{
  Email: string,
  Password: string
}

interface loggedIn {
  status: boolean;
}
interface logout {
  status: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  serverUrl = "http://localhost:63178/api/";

  private isLoggedInStatus = JSON.parse(
    localStorage.getItem("loggedIn") || "false"
  );

  constructor(private _http: HttpClient) {}


  setLoggedIn(value: boolean) {
    this.isLoggedInStatus = value;
    localStorage.setItem("loggedIn", "true");
  }


  get isLoggedIn() {
    return JSON.parse(
      localStorage.getItem("loggedIn") || this.isLoggedInStatus.toString()
    );
  }

  login(login) {
    return this._http.post<login>(this.serverUrl + "Users", login);
  }

  userLoggedIn(): Observable<loggedIn> {
    return this._http.get<loggedIn>(this.serverUrl + "/auth");
  }

  logout() {
    return this._http.get<logout>(this.serverUrl + "/logout");
  }
}
