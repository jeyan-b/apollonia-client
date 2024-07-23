import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiCallService } from 'src/app/api-call.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent {
  departmentForm!: FormGroup;
  actionName = 'Add';
  currentDepartmentId: any;
  constructor(
    private apiCallService: ApiCallService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}
  ngOnInit() {
    this.departmentForm = new FormGroup({
      departmentName: new FormControl('', Validators.required),
      departmentId: new FormControl('', Validators.required),
    });
    this.activatedRoute.params.subscribe((res: any) => {
      console.log(res);
      this.currentDepartmentId = res?.id;
      if (this.currentDepartmentId) {
        this.actionName = 'Edit';
        this.getDepartmentById(this.currentDepartmentId);
      }
    });
  }

  getDepartmentById(id: any) {
    this.apiCallService.getDepartmentById(id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.departmentForm.controls['departmentName'].setValue(
          response[0].name
        );
        this.departmentForm.controls['departmentId'].setValue(response[0].id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  saveDepartment() {
    console.log(this.departmentForm.value);
    this.departmentForm.markAsDirty();
    this.departmentForm.markAllAsTouched();
    if (this.departmentForm.valid) {
      let payload = {
        name: this.departmentForm.value.departmentName,
        id: this.departmentForm.value.departmentId,
      };
      this.apiCallService.postDepartment(payload).subscribe({
        next: (response) => {
          console.log(response);
          this.toastrService.success(
            'Department added successfully!',
            'Success!'
          );
          this.departmentForm.reset();
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

  updateDepartment() {
    console.log(this.departmentForm.value);
    this.departmentForm.markAsDirty();
    this.departmentForm.markAllAsTouched();
    if (this.departmentForm.valid) {
      let payload = {
        name: this.departmentForm.value.departmentName,
        id: this.departmentForm.value.departmentId,
      };
      this.apiCallService
        .updateDepartment(payload, this.currentDepartmentId)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.toastrService.success(
              'Department updated successfully!',
              'Success!'
            );
            this.router.navigate(['department/list/']);
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
