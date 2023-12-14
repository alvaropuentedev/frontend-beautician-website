import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
  public showAlertSucces = signal(false);
  public showAlertError = signal(false);
  public deleteAlertSucces = signal(false);
  public deleteAlertError = signal(false);

  constructor() {}

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
