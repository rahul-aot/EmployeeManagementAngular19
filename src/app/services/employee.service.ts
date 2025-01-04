import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, IApiResponse } from '../model/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  createNewEmployee(obj: Employee){
    return this.http.post<Employee>('https://projectapi.gerasim.in/api/EmployeeManagement/CreateEmployee', obj);
  }

  getAllEmployees(){
    return this.http.get<Employee[]>('https://projectapi.gerasim.in/api/EmployeeManagement/GetAllEmployees');
  }

  deleteEmployeeById(id: number){
    return this.http.delete<Employee>(`https://projectapi.gerasim.in/api/EmployeeManagement/DeleteEmployee/=${id}`);
  }
}
