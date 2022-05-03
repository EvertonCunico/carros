import { Marca } from './marca';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  baseUrl = `${environment.api}/marcas`;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  incluir(marca: Marca): Observable<Marca> {
    return this.http.post<Marca>(this.baseUrl, marca).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  listar(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Marca> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Marca>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(marca: Marca): Observable<Marca> {
    const url = `${this.baseUrl}/${marca.id}`;
    return this.http.put<Marca>(url, marca).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Marca> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Marca>(url).pipe(
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
