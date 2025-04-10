import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from 'src/app/models/test';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  UrlTest="http://localhost:8089/Projetback"
    constructor(private http:HttpClient) { }
  
    getallTest():Observable<any>{
      return this.http.get<any>(`${this.UrlTest}/test/getAllTest`)
    }
    
    addTest(test: Test): Observable<Test[]>{
      return this.http.post<Test[]>(`${this.UrlTest}/test/addTest`, test);
    }

    deleteTest(idtest:any):Observable<any>{
      return this.http.delete<any>(`${this.UrlTest}/test/deleteTest/${idtest}`)
    }

    getTest(idtest:any):Observable<Test>{
      return this.http.get<Test>(`${this.UrlTest}/test/getTestById/${idtest}`)
    }

    updateTest(test:Test):Observable<Test[]>{
      return this.http.put<Test[]>(`${this.UrlTest}/test/updateTest`,test);
    }
}
