import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Employee } from '../models/employee.model';
import { AddEmployee, RemoveEmployee, displayEmployees } from '../actions/employees.actions';
import { Injectable } from '@angular/core';
import { EmployeeService } from '../employee.service';

export class EmployeeStateModel {
    employees!: Employee[];
}

@State<EmployeeStateModel>({
    name: 'employees',
    defaults: {
        employees: []
    }
})

@Injectable()
export class EmployeeState {
  constructor(private eService: EmployeeService){}

    @Selector()
    static getemployees(state: EmployeeStateModel) {
        return state.employees
    }

    @Action(displayEmployees)
    display({getState, setState}: StateContext<EmployeeStateModel>){
      this.eService.getEmployees().subscribe({
        next:data=>{
          const state = getState();
          setState({...state, employees: data})
        },
        error:err=>{
          console.log('get error',err)
        }
      })
    }

    @Action(AddEmployee)
    add({getState, patchState }: StateContext<EmployeeStateModel>, { employee }:AddEmployee) {
        this.eService.newEmployee(employee).subscribe({
          next:data=>{
            console.log('data',data)
            const state = getState();
            patchState({employees: [...state.employees, data]
            })
          },
          error:err=>{
            console.log('post error',err)
          }
        })

    }

    @Action(RemoveEmployee)
    remove({getState, patchState }: StateContext<EmployeeStateModel>, { id }:RemoveEmployee) {
        this.eService.deleteEmployees(id).subscribe({
          next:data=>{
            const state = getState();
            const index = state.employees.findIndex(emp=>emp.id===id)
            state.employees.splice(index,1)
            patchState({employees: getState().employees})
          }

        })
    }

}

