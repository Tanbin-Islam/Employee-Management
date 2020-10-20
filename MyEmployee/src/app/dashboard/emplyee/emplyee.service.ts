import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Emplyee } from "./emplyee";
import { Department } from "../department/department";
import { Users } from "../users/users";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class EmplyeeService {
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
  getEmployee() {
    return this._http
      .get<Position[]>(this.serverUrl + "Employees")
      .pipe(catchError(this.handleError));
  }




  /**
   * Add new data
   * @param id
   */
  addEmployee(data): Observable<Position> {
    return this._http.post<Position>(this.serverUrl + "Employees", data);
  }

  /**
   * Update single item
   * @param id
   */
  updateEmp(data) {
    return this._http
      .put<Position>(this.serverUrl + "/employees/update", data)
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete single item
   *
   */
  onDelete(id: number) {
    return this._http
      .delete<Position>(this.serverUrl + "Employees/" + id)
      .pipe(catchError(this.handleError));
  }
}
