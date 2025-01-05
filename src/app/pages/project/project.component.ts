import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {


  employeeService= inject( EmployeeService );

  EmployeeData$: Observable<Employee[]> =new Observable<Employee[]>();


  currentView: string = 'list';

  projectForm: FormGroup = new FormGroup({});

  constructor() {
    this.initializeForm();
    debugger
    this.EmployeeData$ =this.employeeService.getAllEmployees();

    this.EmployeeData$.subscribe({
      next: (data) => console.log('Employee data received:', data),
      error: (err) => console.error('Error fetching employees:', err),
    });
  }

  initializeForm(){
    this.projectForm = new FormGroup({
        projectId: new FormControl(0),
        projectName: new FormControl(""),
        clientName: new FormControl(""),
        startDate: new FormControl(""),
        leadByEmpId: new FormControl(0),
        contactPerson: new FormControl(""),
        contactNo: new FormControl(""),
        emailId: new FormControl(""),
    });
  }

}
