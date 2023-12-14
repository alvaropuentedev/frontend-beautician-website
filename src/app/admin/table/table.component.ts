import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../service/admin.service';
import { Client } from '../interfaces/client.interface';
import { Subscription } from 'rxjs';
import { MessageService } from '../../service/message.service';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  private readonly adminService = inject(AdminService);
  private readonly messageService = inject(MessageService);

  public clients: Client[] = [];
  public loading = true;

  public cols: Column[] = [];
  private clickEvent: Subscription;
  public deleteAlertSucces = this.messageService.deleteAlertSucces;
  public deleteAlertError = this.messageService.deleteAlertError;
  public totalAppointmentDates = 0;

  constructor() {
    this.clickEvent = this.adminService.getNewClientEvent().subscribe({
      next: () => {
        this.getListClients();
      },
    });
  }

  ngOnInit(): void {
    this.cols = [
      { header: '#', field: 'id_firma' },
      { header: 'Nombre', field: 'Nombre' },
      { header: 'Teléfono', field: 'Teléfono' },
      { header: 'Fecha proxíma Cita', field: 'Fecha proxíma Cita' },
      { header: 'Hora proxíma Cita', field: 'Hora proxíma Cita' },
      { header: '', field: '' },
    ];
    this.getListClients();
  }

  getListClients() {
    this.adminService.listClient().subscribe({
      next: (data: Client[]) => {
        this.clients = this.splitDateTime(data);
        this.totalAppointmentDates = this.countTotalClients(this.clients);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  splitDateTime(client: Client[]) {
    return client.map(elem => {
      const dateTimeArray = elem.appointment_date.split('T');

      if (dateTimeArray.length === 2) {
        const [date, time] = dateTimeArray;
        return {
          ...elem,
          date,
          time,
        };
      } else {
        console.error('El formato de fecha y hora es incorrecto.');
        return elem;
      }
    });
  }

  deleteClient(id_client: number) {
    this.loading = true;
    this.adminService.deleteClient(id_client).subscribe({
      next: () => {
        this.messageService.handleDeleteAlertSuccesMsg();
        this.getListClients();
        this.loading = false;
        console.log('CLIENTE ELIMINADO!');
      },
      error: () => {
        this.messageService.handleDeleteAlertErrorMsg();
      },
    });
  }

  countTotalClients(clients: Client[]) {
    const occurrencesCount = clients.reduce((count, obj) => {
      if (obj.id_client) {
        return count + 1;
      }
      return count;
    }, 0);
    return occurrencesCount;
  }
}
