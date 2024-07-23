import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiCallService } from 'src/app/api-call.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  employeeForm!: FormGroup;
  actionName = 'Add';
  departments: any = [];
  currentEmployeeId: any;
  constructor(
    private apiCallService: ApiCallService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}
  ngOnInit() {
    this.employeeForm = new FormGroup({
      employeeName: new FormControl('', Validators.required),
      departmentId: new FormControl('', Validators.required),
      employeeSurName: new FormControl('', Validators.required),
      employeeDob: new FormControl('', Validators.required),
    });
    this.getDepartment();
    this.activatedRoute.params.subscribe((res: any) => {
      console.log(res);
      this.currentEmployeeId = res?.id;
      if (this.currentEmployeeId) {
        this.actionName = 'Edit';
        this.getEmployeeById(this.currentEmployeeId);
      }
    });
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

  getEmployeeById(id: any) {
    this.apiCallService.getEmployeeById(id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.employeeForm.controls['employeeName'].setValue(
          response[0].name
        );
        this.employeeForm.controls['employeeSurName'].setValue(response[0].surName);
        this.employeeForm.controls['employeeDob'].setValue(response[0].dob);
        this.employeeForm.controls['departmentId'].setValue(response[0].departmentId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  saveEmployee() {
    console.log(this.employeeForm.value);
    this.employeeForm.markAsDirty();
    this.employeeForm.markAllAsTouched();
    if (this.employeeForm.valid) {
      let payload = {
        name: this.employeeForm.value.employeeName,
        departmentId: this.employeeForm.value.departmentId,
        surName: this.employeeForm.value.employeeSurName,
        dob: this.employeeForm.value.employeeDob,
      };
      this.apiCallService.postEmployee(payload).subscribe({
        next: (response) => {
          console.log(response);
          this.toastrService.success(
            'Employee added successfully!',
            'Success!'
          );
          this.employeeForm.reset();
        },
        error: (err) => {
          console.log(err);
          this.toastrService.error(
            'For more information check the log!',
            'Error occurred!'
          );
        },
      });
    } else {
      console.log('Invalid form');
    }
  }

  updateEmployee() {
    console.log(this.employeeForm.value);
    this.employeeForm.markAsDirty();
    this.employeeForm.markAllAsTouched();
    if (this.employeeForm.valid) {
      let payload = {
        name: this.employeeForm.value.employeeName,
        departmentId: this.employeeForm.value.departmentId,
        surName: this.employeeForm.value.employeeSurName,
        dob: this.employeeForm.value.employeeDob,
      };
      this.apiCallService
        .updateEmployee(payload, this.currentEmployeeId)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.toastrService.success(
              'Employee updated successfully!',
              'Success!'
            );
            this.router.navigate(['employee/list/']);
          },
          error: (err) => {
            console.log(err);
            this.toastrService.error(
              'For more information check the log!',
              'Error occurred!'
            );
          },
        });
    } else {
      console.log('Invalid form');
    }
  }
}
