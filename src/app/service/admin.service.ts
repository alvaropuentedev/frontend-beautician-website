import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../admin/interfaces/client.interface';
import { enviroment } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl: string = enviroment.base_url ;


  // private baseUrl = 'http://localhost:8080'

  constructor() {}

  listClient(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/api/listClient`);
  }

  createClient(name: string, phone: string, appointment_date: string): Observable<Client> {
    const body = { name, phone, appointment_date }
    return this.http.post<Client>(`${this.baseUrl}/api/createClient`, body);
  }

  deleteClient(id_client: number):Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/api/deleteClient/${id_client}`);
  }
}
