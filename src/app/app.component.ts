import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddEmployee } from './actions/employees.actions';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Employee } from './models/employee.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngxs';
  employeeForm!: FormGroup;
  constructor(private store: Store,
              private fb: FormBuilder){}
  ngOnInit(){
    this.employeeForm = this.fb.group({
      id: ['',Validators.required],
      name: ['', Validators.required],
      dob: ['',Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required]
    })
  }
  employeeDetails(employeeData: Employee){
    this.employeeForm.markAllAsTouched();
    if(this.employeeForm.valid){
      console.log(employeeData)
      this.addEmployee(employeeData)

    }
  }
  addEmployee(employeeData: Employee) {
    this.store.dispatch(new AddEmployee(employeeData))
  }
}
