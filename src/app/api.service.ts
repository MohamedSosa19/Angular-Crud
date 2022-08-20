import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _HttpClient:HttpClient) { }

  postEmployee(data:any){
    return this._HttpClient.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{
      return res
    }))

  

  }

  getEmployee(){
    return this._HttpClient.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res
    }))
  }
  updateEmployee(data:any,id:number){
    return this._HttpClient.put<any>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:any)=>{
      return res
    }))
  }
  deleteEmployee(id:number){
    return this._HttpClient.delete<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res:any)=>{
      return res
    }))
  }
  
}
