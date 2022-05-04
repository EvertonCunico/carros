import { Marca } from './../marca';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-marca-dialog',
  templateUrl: './marca-dialog.component.html',
  styleUrls: ['./marca-dialog.component.css']
})
export class MarcaDialogComponent implements OnInit {

  data !: Marca;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public element: Marca,
    public dialogRef: MatDialogRef<MarcaDialogComponent>,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    if (this.validarCampos()) {
      this.element.id = this.data.id;
      this.element.nome = this.data.nome;
      this.dialogRef.close(this.data);
    } else {
      alert("Existem campos obrigatórios não preenchidos!")
    }
  }

  validarCampos() : boolean{
    return this.data != undefined &&
           this.data != null &&
           this.data.nome !== undefined &&
           this.data.nome !== '' &&
           this.data.nome !== null;
  }

  ngOnInit () {
    this.data = {
      id: this.element.id,
      nome: this.element.nome
    }
  }

}
