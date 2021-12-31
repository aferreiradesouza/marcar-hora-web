import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { DateService } from './date.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loading = false;
  public loadingUltimaMarcacao = false;
  public msgUltimaHoraMarcada = '';
  title = 'marcar-hora-web';

  constructor(private _snackBar: MatSnackBar, private http: HttpClient) { }

  ngOnInit(): void {
      this.obterUltimaMarcacao();
  }

  async marcarHora(): Promise<void> {
    this.loading = true;
    await this.http.post(`https://marcar-hora.vercel.app/marcarHora`, { dateTime: DateService.format(new Date(), undefined, 'YYYY-MM-DDTHH:mm:ss') }).toPromise().then(response => {
      this._snackBar.open('Marcação efetuada com sucesso!', 'Fechar', {
        duration: 3000
      });
    }).catch(err => {console.log(err)}).finally(() => {
      this.loading = false;
    });
  }

  async obterUltimaMarcacao(): Promise<void> {
    this.loadingUltimaMarcacao = true;
    await this.http.get(`https://marcar-hora.vercel.app/obterUltimaHoraMarcada?dateTime=${DateService.format(new Date(), undefined, 'YYYY-MM-DDTHH:mm:ss')}`).toPromise().then((response: any) => {
      this.msgUltimaHoraMarcada = response.mensagem;
    }).catch(err => {console.log(err)}).finally(() => {
      this.loadingUltimaMarcacao = false;
    });
  }
}

