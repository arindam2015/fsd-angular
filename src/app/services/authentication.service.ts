import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  private authUrl:string;

  constructor(private httpClient:HttpClient) 
  { 
    this.authUrl='http://localhost:3000/auth/v1';
  }

  authenticateUser(data) {
    return this.httpClient.post(this.authUrl,data);

  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken',token);

  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token): Promise<boolean> {
    return new Promise((resolve,reject)=>{
      this.httpClient.post(this.authUrl+'/isAuthenticated',{
        headers:{'Authorization':`Bearer ${token}`}
      }).subscribe(res=>{
        resolve(res['isAuthenticated']);
      },
      err=>{
        reject(err);
      })
    })
  }
}
