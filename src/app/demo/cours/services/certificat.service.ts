import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Certificat } from 'src/app/models/certificat';

@Injectable({
  providedIn: 'root'
})
export class CertificatService {

    UrlCertificat="http://localhost:8089/Projetback"
      constructor(private http:HttpClient) { }
    
      getallCertificat():Observable<any>{
        return this.http.get<any>(`${this.UrlCertificat}/certificat/getAllCertificat`)
      }
      
      addCertificat(certificat: Certificat): Observable<Certificat[]>{
        return this.http.post<Certificat[]>(`${this.UrlCertificat}/certificat/addCertificat`, certificat);
      }
  
      deleteCertificat(idcertificat:any):Observable<any>{
        return this.http.delete<any>(`${this.UrlCertificat}/certificat/deleteCertificat/${idcertificat}`)
      }
  
      getCertificat(idcertificat:any):Observable<Certificat>{
        return this.http.get<Certificat>(`${this.UrlCertificat}/certificat/getCertificatById/${idcertificat}`)
      }
  
      updateCertificat(certificat:Certificat):Observable<Certificat[]>{
        return this.http.put<Certificat[]>(`${this.UrlCertificat}/certificat/updateCertificat`,certificat);
      }
}
