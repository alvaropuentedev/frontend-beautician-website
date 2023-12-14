import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../service/admin.service';
import { Client } from '../interfaces/client.interface';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{
  private readonly adminService = inject(AdminService);

  public clients: Client[] = [];

public cols: Column[] = [];

  ngOnInit(): void {
    this.cols = [
      { header: '', field: '' },
      { header: 'Nombre', field: 'Nombre' },
      { header: 'Teléfono', field: 'Teléfono' },
      { header: 'Proxíma Cita', field: 'Proxíma Cita' }
  ];
  this.getListClients();
  }

  getListClients() {
    this.adminService.listClient().subscribe({
      next: (data: Client[]) => {
        this.clients = data;
        console.log(this.clients)
      }
    })
  }

  deleteClient(id_client: number) {
    this.adminService.deleteClient(id_client)
    .subscribe({
      next: () => {
        this.getListClients();
        console.log('CLIENTE ELIMINADO!')
       }

    });
  }

}
