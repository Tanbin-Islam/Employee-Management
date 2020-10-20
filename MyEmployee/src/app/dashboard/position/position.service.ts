import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Position } from "./position";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PositionService {
  constructor(private _http: HttpClient) {}

  serverUrl = "http://localhost:63178/api/";
  errorData: {};

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
   * Get dept
   */
  getDept() {
    return this._http
      .get<Position[]>(this.serverUrl + "Departments")
      .pipe(catchError(this.handleError));
  }

  /**
   * Get All Data
   */
  getPost() {
    return this._http
      .get<Position[]>(this.serverUrl + "Positions")
      .pipe(catchError(this.handleError));
  }

  /**
   * Add new data
   * @param id
   */
  addPost(data): Observable<Position> {
    return this._http
      .post<Position>(this.serverUrl + "Positions", data)
      .pipe(catchError(this.handleError));
  }

  /**
   * Update single item
   * @param id
   */
  updatePost(data) {
    return this._http
      .put<Position>(this.serverUrl + "/positions/update", data)
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete single item
   *
   */
  onDelete(id: number) {
    return this._http
      .delete<Position>(this.serverUrl + "Positions/" + id)
      .pipe(catchError(this.handleError));
  }
}
