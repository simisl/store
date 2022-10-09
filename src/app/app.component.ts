import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AddEmployee, displayEmployees, RemoveEmployee } from './actions/employees.actions';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Employee } from './models/employee.model';
import { HttpClient } from '@angular/common/http';
import { EmployeeState } from './state/employees.state';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngxs';
  employeeForm!: FormGroup;
  emp!: any;
  @Select(EmployeeState.getemployees) employees!: Observable<Employee[]>;
  constructor(private store: Store,
              private fb: FormBuilder,
              private http: HttpClient){}
  ngOnInit(){
    this.employeeForm = this.fb.group({
      empid: ['',Validators.required],
      name: ['', Validators.required],
      dob: ['',Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required]
    })
    this.loadEmployees();



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
  loadEmployees(){
    this.store.dispatch(new displayEmployees())
    this.employees.subscribe({
      next:data=>{
        this.emp = data
        this.emp.map((d:any)=>{
          var da = d.dob.split('T')
          d.dob = da[0]
        })
      }
    })
  }
  deleteEmployee(id:number){
    console.log('id',id)
    this.store.dispatch(new RemoveEmployee(id))
  }
  cancel(){
    this.employeeForm.reset();
  }
}
