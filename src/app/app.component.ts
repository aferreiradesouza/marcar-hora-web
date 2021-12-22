import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { DateService } from './date.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public loading = false;
  title = 'marcar-hora-web';

  constructor(private _snackBar: MatSnackBar, private http: HttpClient) { }

  async marcarHora(): Promise<void> {
    this.loading = true;
    await this.http.post(`https://marcar-hora.vercel.app/MarcarHora`, { dateTime: DateService.format(new Date(), undefined, 'YYYY-MM-DDTHH:mm:ss') }).toPromise().then(response => {
      this._snackBar.open('Marcação efetuada com sucesso!', 'Fechar', {
        duration: 3000
      });
    }).catch(err => {console.log(err)}).finally(() => {
      this.loading = false;
    });
  }
}

