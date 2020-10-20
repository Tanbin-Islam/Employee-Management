import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Users } from "./users";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  serverUrl = "http://localhost:63178/api/";
  errorData: {};

  constructor(private _http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.

      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong,

      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }

    // return an observable with a user-facing error message

    this.errorData = {
      errorTitle: "Oops! Request for document failed",
      errorDesc: "Something bad happened. Please try again later.",
    };
    return throwError(this.errorData);
  }

  /**
   * Get user roles
   */
  // getRoles() {
  //   return this._http
  //     .get<Users[]>(this.serverUrl + "roles")
  //     .pipe(catchError(this.handleError));
  // }

  /**
   * get all user data
   * @param user
   */
  getUsers(): Observable<Users[]> {
    return this._http
      .get<Users[]>(this.serverUrl + "Users")
      .pipe(catchError(this.handleError));
  }

  /**
   * Add new users
   */
  addUser(user): Observable<Users> {
    return this._http
      .post<Users>(this.serverUrl + "Users",JSON.stringify(user),this.httpOptions);
      // .pipe(catchError(this.handleError));
  }

  /**
   * Update user
   * @param id
   */
  updateUser(user, id) {
    return this._http
      .put<Users>(this.serverUrl + "Users/"+id, user); 
      // .pipe(catchError(this.handleError));
  }

  /**
   * Delete data
   */
  onDelete(id: number) {
    return this._http
      .delete<Users>(this.serverUrl + "users/" + id)
      .pipe(catchError(this.handleError));
  }
}
