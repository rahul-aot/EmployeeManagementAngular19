import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Employee, IApiResponse, IchildDepartment, IparentDepartment } from '../../model/Employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit{

  parentDeptList: IparentDepartment[] = [];

  childDeptList: IchildDepartment[]= [];

  deptId: number=0;

  EmployeeObj: Employee = new Employee();
  EmployeeList: Employee[]=[];

  masterService = inject(MasterService);
  employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.getParentDeptList();
    this.showEmployeeList();
  }

  editEmployee(Obj: any){
    this.EmployeeObj = Obj;
  }

  getParentDeptList(){
    this.masterService.getParentDept().subscribe((res: IApiResponse) => {
      this.parentDeptList = res.data;
    })
  }

  onDeptChange(){
    this.masterService.getChildDeptById(this.deptId).subscribe((res: IApiResponse) => {
      this.childDeptList = res.data;
    })
  }

  onSubmit(){
    this.employeeService.createNewEmployee(this.EmployeeObj).subscribe((res: Employee) => {
        alert("Employee Created Successfully");
        this.showEmployeeList();
    },error => {
      alert("Something went wrong");
    })
  }
  
  showEmployeeList(){
    this.employeeService.getAllEmployees().subscribe((res: Employee[]) => {
      this.EmployeeList=res;
    })
  }

  deleteEmployee(id: number){
;    if(!confirm("Are you sure you want to delete this employee?")){
      return;
    }
    this.employeeService.deleteEmployeeById(id).subscribe((res: Employee) => {
      alert("Employee Deleted Successfully");
      this.showEmployeeList();
    });
  }
}
