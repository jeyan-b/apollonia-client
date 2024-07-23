import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiCallService } from 'src/app/api-call.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  employees: any = [];
  isDelete = false;
  deletableEmp: any;
  departments: any = [];
  constructor(private apiCallService: ApiCallService, private router: Router, private toastrService: ToastrService) {}
  async ngOnInit() {
    await this.getDepartment();
    this.getEmployees();
  }

  getDepartment() {
    this.apiCallService.getDepartment().subscribe({
      next: (response) => {
        console.log(response);
        this.departments = response;
      },
      error: (err) => {
        console.log(err);
      },
    });

  }

  getEmployees() {
    this.apiCallService.getEmployees().subscribe({
      next: (response:any) => {
        console.log(response);
        let updatedResponse:any = [];
        this.departments.forEach((dept:any) => {
          response.forEach((emp:any) => {
          if(dept.id === emp.departmentId){
            emp.department = dept.name
            updatedResponse.push(emp)
          }            
          });          
        });
        this.employees = updatedResponse;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editEmployee(id: any) {
    this.router.navigate(['employee/edit/' + id]);
  }

  deleteEmployee(dept: any) {
    this.deletableEmp = dept;
    this.isDelete = true;
  }
  closeDeletePopup() {
    this.isDelete = false;
  }

  deleteEmp() {
    this.apiCallService.deleteEmployeeById(this.deletableEmp._id).subscribe({
      next: (response) => {
        console.log(response);
        this.toastrService.success(
          'Employee deleted successfully!',
          'Success!'
        );
        this.closeDeletePopup();
        this.getEmployees();
      },
      error: (err) => {
        console.log(err);
        this.toastrService.error(
          'For more information check the log!',
          'Error occurred!'
        );
      },
    });
  }

}
