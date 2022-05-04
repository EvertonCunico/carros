import { MarcaService } from './../../marca/marca.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Carro } from './../carro';
import { Component, OnInit, Inject } from '@angular/core';
import { Marca } from '../../marca/marca';

@Component({
  selector: 'app-carro-dialog',
  templateUrl: './carro-dialog.component.html',
  styleUrls: ['./carro-dialog.component.css']
})
export class CarroDialogComponent implements OnInit {

  data !: Carro;
  maxYear : number = new Date().getFullYear() + 1;
  marcas: Marca[] = [];
  marcasComFiltro: Marca[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public element: Carro,
    public dialogRef: MatDialogRef<CarroDialogComponent>,
    public marcaService: MarcaService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    if (this.validarCampos()) {
      this.element.id = this.data.id;
      this.element.modelo = this.data.modelo;
      this.element.cor = this.data.cor;
      this.element.ano = this.data.ano;
      this.element.marca = this.data.marca;
      this.dialogRef.close(this.data);
    } else {
      alert("Formulário inválido! Verifique o preenchimento e tente novamente!")
    }
  }

  validarCampos() : boolean{
    return this.data != undefined &&
           this.data != null &&
           this.data.modelo !== undefined &&
           this.data.modelo !== '' &&
           this.data.modelo !== null &&
           this.data.marca !== undefined &&
           this.data.marca !== null &&
           (this.data.ano == null || (this.data.ano >= 1960 && this.data.ano <= 2023));
  }

  ngOnInit () {
    this.data = {
      id: this.element.id,
      modelo: this.element.modelo,
      cor: this.element.cor,
      ano: this.element.ano,
      marca: this.element.marca
    }

    this.marcaService.listar().subscribe(itens => {
      this.marcas = itens;
      this.marcasComFiltro = this.marcas;
    })
  }

  onKeyMarca(value: Event) {
    let filtro = (value.target as HTMLInputElement).value;
    this.marcasComFiltro = this.search(filtro);
  }

  search(value: string | null) {
    if (value == null) {
      return this.marcas;
    } else {
      let filter = value.toLowerCase();
      return this.marcas.filter(option => option.nome.toLowerCase().startsWith(filter));
    }
  }

}
