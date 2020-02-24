import { Injectable } from '@angular/core';

import { environment as env } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpClientService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(email: string, password: string): Observable<string> {
    return this.httpClient.post<string>(`${env.apiURL}/auth/login`, {
      email,
      password
    });
  }
}
