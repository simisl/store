import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  getEmployees(){
    return this.http.get<Employee[]>('https://mockend.com/simisl/store/employees?limit=5',{
      headers:{
    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }})
  }
  deleteEmployees(id: number){
    return this.http.delete('https://mockend.com/simisl/store/employees/'+id)
  }
  newEmployee(employee: Employee){
    return this.http.post<Employee>('https://mockend.com/simisl/store/employees',JSON.stringify(employee),{headers:{'Content-type': 'application/json; charset=UTF-8'}})

  }

}
