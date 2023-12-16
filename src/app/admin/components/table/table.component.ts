import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../service/admin.service';
import { Client } from '../../interfaces/client.interface';
import { Subscription } from 'rxjs';
import { MessageService } from '../../../service/message.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  private readonly adminService = inject(AdminService);
  private readonly messageService = inject(MessageService);
  private readonly fb = inject(FormBuilder);
  private clickEvent: Subscription;

  public clients: Client[] = [];
  public loading = true;

  public cols: Column[] = [];
  public deleteAlertSucces = this.messageService.deleteAlertSucces;
  public deleteAlertError = this.messageService.deleteAlertError;
  public totalAppointmentDates = 0;
  /**
   * ? Search Form
   */
  public searchForm: FormGroup = this.fb.group({
    searchQuery: [''],
  });

  constructor() {
    this.clickEvent = this.adminService.getNewClientEvent().subscribe({
      next: () => {
        this.getListClients();
      },
    });
    const searchQueryControl = this.searchForm.get('searchQuery');
    if (searchQueryControl) {
      searchQueryControl.valueChanges.subscribe(() => {
        this.getListClients();
      });
    }
  }

  ngOnInit(): void {
    this.cols = [
      { header: '#', field: 'id_firma' },
      { header: 'Nombre', field: 'Nombre' },
      { header: 'Teléfono', field: 'Teléfono' },
      { header: 'Fecha', field: 'Fecha proxima Cita' },
      { header: 'Hora', field: 'Hora proxima Cita' },
      { header: '', field: '' },
    ];
    this.getListClients();
  }
/**
 * * Filter of clients
 *
 */
  get filteredClients(): Client[] {
    const query = this.searchForm.get('searchQuery');
    if (query) {
      const queryToLower = query.value.toLowerCase();
      return this.clients.filter(client => client.name.toLowerCase().includes(queryToLower));
    } else {
      return this.clients;
    }
  }

  /**
   * * Get all clients
   */
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
        // eslint-disable-next-line prefer-const
        let [date, time] = dateTimeArray;
        date = this.reverseDateFormat(date);
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

  reverseDateFormat(date: string) {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
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
