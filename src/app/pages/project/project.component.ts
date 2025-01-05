import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee, EmployeeProject, Project } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule,FormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {

  @ViewChild("mymodel") EmployeeModel: ElementRef | undefined;


  employeeService= inject( EmployeeService );

  EmployeeData$: Observable<Employee[]> =new Observable<Employee[]>();
  projectList: Project[]=[];

  currentView: string = 'list';

  projectForm: FormGroup = new FormGroup({});

  employeeProject: EmployeeProject = new EmployeeProject();

  constructor() {
    this.initializeForm();
    this.EmployeeData$ =this.employeeService.getAllEmployees();

    this.EmployeeData$.subscribe({
      next: (data) => console.log('Employee data received:', data),
      error: (err) => console.error('Error fetching employees:', err),
    });
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  onaddEmployee(projectId: number){
    debugger
    this.employeeProject.empProjectId = projectId;
    if(this.EmployeeModel){
      this.EmployeeModel.nativeElement.style.display= 'block';
    }
  }
  onCloseEmployee(){
    if(this.EmployeeModel){
      this.EmployeeModel.nativeElement.style.display= 'none';
    }
  }

  initializeForm(project?: Project) {
    this.projectForm = new FormGroup({
        projectId: new FormControl(project? project.projectId : 0),
        projectName: new FormControl(project? project.projectName :""),
        clientName: new FormControl(project? project.clientName :""),
        startDate: new FormControl(project? project.startDate :""),
        leadByEmpId: new FormControl(project? project.leadByEmpId : 0),
        contactPerson: new FormControl(project? project.contactPerson :""),
        contactNo: new FormControl(project? project.contactNo :""),
        emailId: new FormControl(project? project.emailId :""),
    });
  }

  onSubmit(){
    const formValue= this.projectForm.value;

    if(formValue.projectId === 0){
      this.employeeService.createNewProject(formValue).subscribe((res:Project) => {
        alert("Project Created Successfully");
        this.getAllProjects();
        this.currentView = 'list';
      },error=>{
        alert("Project creation failed");
      })
    }else{
      this.employeeService.updateProject(formValue).subscribe((res:Project) => {
        alert("Project Updated Successfully");
        this.getAllProjects();
        this.currentView = 'list';
      },error=>{
        alert("Project creation failed");
      })
    }
    
  }

  getAllProjects(){
    this.employeeService.getprojects().subscribe((res: Project[]) => {
      this.projectList = res;
    }
    )
  }

  editProject(project: Project){
    this.initializeForm(project);
  }

  addProjectEmployee(){
    this.employeeService.addNewEmp(this.employeeProject).subscribe((res: EmployeeProject) => {
      alert("Employee Added Successfully"); 
    })
  }
}
