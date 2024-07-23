import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  baseUrl: string = 'http://localhost:8081/api/';
   
isLoading$ = new Subject();

  constructor(private http: HttpClient) {}

  postDepartment(payload: any) {
    let _url = this.baseUrl + 'department';
    return this.http.post(_url, payload);
  }

  updateDepartment(payload: any, id: any) {
    let _url = this.baseUrl + 'updateDepartmentById/' + id;
    return this.http.put(_url, payload);
  }

  deleteDepartmentById(id: any) {
    let _url = this.baseUrl + 'deleteDepartmentById/' + id;
    return this.http.delete(_url);
  }

  getDepartment() {
    let _url = this.baseUrl + 'department';
    return this.http.get(_url);
  }

  getDepartmentById(id: any) {
    let _url = this.baseUrl + 'departmentById/' + id;
    return this.http.get(_url);
  }

  // API Endpoints for Employee

  postEmployee(payload: any) {
    let _url = this.baseUrl + 'employee';
    return this.http.post(_url, payload);
  }

  updateEmployee(payload: any, id: any) {
    let _url = this.baseUrl + 'updateEmployeeById/' + id;
    return this.http.put(_url, payload);
  }

  deleteEmployeeById(id: any) {
    let _url = this.baseUrl + 'deleteEmployeeById/' + id;
    return this.http.delete(_url);
  }

  getEmployees() {
    let _url = this.baseUrl + 'employees';
    return this.http.get(_url);
  }

  getEmployeeById(id: any) {
    let _url = this.baseUrl + 'getEmployeeById/' + id;
    return this.http.get(_url);
  }
}
