import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../service/admin.service';
import { Client } from '../interfaces/client.interface';
import { Subscription } from 'rxjs';

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

  public clients: Client[] = [];
  public loading = true;

  public cols: Column[] = [];
  private clickEvent: Subscription;
  public deleteAlertSucces = this.adminService.deleteAlertSucces;
  public deleteAlertError = this.adminService.deleteAlertError;

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
      { header: 'Proxíma Cita', field: 'Proxíma Cita' },
      { header: '', field: '' },
    ];
    this.getListClients();
  }

  getListClients() {
    this.adminService.listClient().subscribe({
      next: (data: Client[]) => {
        this.clients = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  deleteClient(id_client: number) {
    this.loading = true;
    this.adminService.deleteClient(id_client).subscribe({
      next: () => {
        this.adminService.handleDeleteAlertSuccesMsg();
        this.getListClients();
        this.loading = false;
        console.log('CLIENTE ELIMINADO!');
      },
      error: () => {
        this.adminService.handleDeleteAlertErrorMsg();
      }
    });
  }
}
