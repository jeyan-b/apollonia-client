import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentRoutingModule } from './department-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiCallService } from '../api-call.service';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentComponent } from './components/department-add/department.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';


@NgModule({
  declarations: [
    DepartmentComponent,
    DepartmentListComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiCallService]
})
export class DepartmentModule { }
