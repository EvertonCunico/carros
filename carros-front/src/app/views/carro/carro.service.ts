import { Observable, catchError, map, EMPTY } from 'rxjs';
import { Carro } from './carro';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  baseUrl = `${environment.api}/carros`;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  incluir(carro: Carro): Observable<Carro> {
    return this.http.post<Carro>(this.baseUrl, carro).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  listar(): Observable<Carro[]> {
    return this.http.get<Carro[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Carro> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Carro>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(carro: Carro): Observable<Carro> {
    const url = `${this.baseUrl}/${carro.id}`;
    return this.http.put<Carro>(url, carro).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Carro> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Carro>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }
}
