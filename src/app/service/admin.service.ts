import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Client } from '../admin/interfaces/client.interface';
import { enviroment } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl: string = enviroment.base_url;
  private listClientSubject = new Subject<unknown>();

  public isSidebarVisible = signal(false);
  public clientList$ = signal<Client[] | null >(null);

  // private baseUrl = 'http://localhost:8080'

  constructor() {}

  listClient(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/api/listClient`);
  }

  createClient(name: string, phone: string, appointment_date: string): Observable<Client> {
    const body = { name, phone, appointment_date };
    return this.http.post<Client>(`${this.baseUrl}/api/createClient`, body);
  }

  deleteClient(id_client: number): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/api/deleteClient/${id_client}`);
  }

  getNewClientEvent() {
    return this.listClientSubject.asObservable();
  }

  sendNewClientEvent() {
    return this.listClientSubject.next(null);
  }

  toggleSidebar() {
    this.isSidebarVisible.set(!this.isSidebarVisible());
  }
}
