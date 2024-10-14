import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://bold-fe-api.vercel.app/api';

  constructor(private http: HttpClient) { }

  getData<T>(): Observable<T> {
    return this.http.get<T>(this.apiUrl);
  }
}

export const httpService = () => {
  const apiService = inject(ApiService);
  return apiService;
};
