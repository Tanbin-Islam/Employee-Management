import { Injectable } from "@angular/core";
import { Department } from "./department";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DepartmentService {
  constructor(private _http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  private headers: HttpHeaders;
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
      .get<Department[]>(this.serverUrl + "Departments")
      .pipe(catchError(this.handleError));
  }

  /**
   * Add new department
   */
  addDept(data): Observable<Department> {
    return this._http
      .post<Department>(this.serverUrl + "Departments", data)
      .pipe(catchError(this.handleError));
  }

  /**
   * Update Department
   * @param id
   */
  updateDept(data, id) {
    return this._http
      .put<Department>(this.serverUrl + "Departments/"+id, data, {headers: this.headers})
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete data
   */
  onDelete(id: number) {
    return this._http
      .delete<Department>(this.serverUrl + "Departments/" + id)
      .pipe(catchError(this.handleError));
  }
}
