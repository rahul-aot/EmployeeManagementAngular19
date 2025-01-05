import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, IApiResponse } from '../model/Employee';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  createNewEmployee(obj: Employee){
    return this.http.post<Employee>('https://projectapi.gerasim.in/api/EmployeeManagement/CreateEmployee', obj);
  }

  // getAllEmployees(){
  //   return this.http.get<Employee[]>();
  // }

  getAllEmployees(): Observable<Employee[]> {
    debugger
    return this.http.get<Employee[]>('https://projectapi.gerasim.in/api/EmployeeManagement/GetAllEmployees').pipe(
      catchError((error) => {
        debugger
        console.error('Error fetching employees:', error);
        return throwError(error);
      })
    );
  }

  deleteEmployeeById(id: number){
    return this.http.delete<Employee>(`https://projectapi.gerasim.in/api/EmployeeManagement/DeleteEmployee/${id}`);
  }

  updateEmployee(obj: Employee){
    return this.http.put<Employee>('https://projectapi.gerasim.in/api/EmployeeManagement/UpdateEmployee/'+ obj.employeeId, obj);
  }
}
