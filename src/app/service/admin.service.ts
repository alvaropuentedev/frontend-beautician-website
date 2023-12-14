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

  public showAlertSucces = signal(false);
  public showAlertError = signal(false);
  public deleteAlertSucces = signal(false);
  public deleteAlertError = signal(false);


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

  getNewClientEvent() {
    return this.listClientSubject.asObservable();
  }

  sendNewClientEvent() {
    return this.listClientSubject.next(null);
  }

  handleAlertSuccesMsg() {
    this.showAlertSucces.set(true);
    setTimeout(() => {
      this.showAlertSucces.set(false);
    }, 3000);
  }
  handleAlertErrorMsg() {
    this.showAlertError.set(true);
    setTimeout(() => {
      this.showAlertError.set(false);
    }, 3000);
  }
  handleDeleteAlertSuccesMsg() {
    this.deleteAlertSucces.set(true);
    setTimeout(() => {
      this.deleteAlertSucces.set(false);
    }, 3000);
  }
  handleDeleteAlertErrorMsg() {
    this.deleteAlertError.set(true);
    setTimeout(() => {
      this.deleteAlertSucces.set(false);
    }, 3000);
  }
}
