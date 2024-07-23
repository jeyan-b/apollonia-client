import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiCallService } from 'src/app/api-call.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
})
export class DepartmentListComponent {
  departments: any = [];
  isDelete = false;
  deletableDept: any;
  constructor(private apiCallService: ApiCallService, private router: Router,  private toastrService: ToastrService) {}
  ngOnInit() {
    this.getDepartment();
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

  editDepartment(id: any) {
    this.router.navigate(['department/edit/' + id]);
  }

  deleteDepartment(dept: any) {
    this.deletableDept = dept;
    this.isDelete = true;
  }
  closeDeletePopup() {
    this.isDelete = false;
  }

  deleteDept() {
    this.apiCallService.deleteDepartmentById(this.deletableDept.id).subscribe({
      next: (response) => {
        this.toastrService.success(
          'Department deleted successfully!',
          'Success!'
        );
        console.log(response);
        this.closeDeletePopup();
        this.getDepartment();
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
