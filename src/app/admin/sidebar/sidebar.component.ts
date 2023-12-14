import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal, Ripple, initTE, Sidenav, Datetimepicker, Input } from 'tw-elements';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly adminService = inject(AdminService);
  private readonly fb = inject(FormBuilder);

  public user = computed(() => this.authService.currentUser());
  public showAlert = false;

  public createClientForm: FormGroup = this.fb.group({
    name: [' ', Validators.required],
    phone: [' ', Validators.required],
    appointment_date: [' ', Validators.required],
  });

  ngOnInit(): void {
    // Inicializar los componentes de tw-elements
    initTE({ Modal, Ripple, Sidenav, Datetimepicker, Input });
  }

  submitClientForm() {
    const { name, phone, appointment_date } = this.createClientForm.value;
    this.adminService.createClient(name, phone, appointment_date)
    .subscribe({
      next: () => {
        this.showAlert = true;
        setTimeout( () => {
          this.showAlert = false;
        }, 3000);
      },
      error: (error) => {
        console.log('Error create client!', error);
      }
    })
  }

  logout() {
    this.authService.logout()
  }
}
