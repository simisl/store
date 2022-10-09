import { Employee } from '../models/employee.model'

export class AddEmployee {
    static readonly type = '[Employee] Add'
    constructor(public employee: Employee) {}
}

export class RemoveEmployee {
    static readonly type = '[EMPLOYEE] Remove'
    constructor(public id: number) {}
}
export class displayEmployees {
  static readonly type = '[EMPLOYEE] Get'

}
