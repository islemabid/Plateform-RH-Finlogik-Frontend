import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertNotificationComponent } from 'src/app/alert-notification/alert-notification.component';

@Injectable({
  providedIn: 'root'
})
export class AlertNotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(displayMessage: string, buttonText: string) {
    this.snackBar.openFromComponent(AlertNotificationComponent, {
      data: {
        message: displayMessage,
        buttonText: buttonText,
        type: 'success'
      },
      
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: 'success'
    });
  }
}
