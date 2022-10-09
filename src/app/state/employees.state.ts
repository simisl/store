import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Employee } from '../models/employee.model';
import { AddEmployee, RemoveEmployee } from '../actions/employees.actions';
import { Injectable } from '@angular/core';

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

    @Selector()
    static getemployees(state: EmployeeStateModel) {
        return state.employees
    }

    @Action(AddEmployee)
    add({getState, patchState }: StateContext<EmployeeStateModel>, { employee }:AddEmployee) {
        const state = getState();
        patchState({
            employees: [...state.employees, employee]
        })
    }

    @Action(RemoveEmployee)
    remove({getState, patchState }: StateContext<EmployeeStateModel>, { id }:RemoveEmployee) {
        patchState({
            employees: getState().employees.filter(a => a.id != id)
        })
    }

}

