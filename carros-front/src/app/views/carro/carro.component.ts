import { CancelDialogComponent } from './../../shared/element/cancel-dialog/cancel-dialog.component';
import { CarroDialogComponent } from './carro-dialog/carro-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CarroService } from './carro.service';
import { MatTable } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Carro } from './carro';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css']
})
export class CarroComponent implements OnInit {

  @ViewChild(MatTable)
  tabela !: MatTable<any>;

  constructor(
    private carroService: CarroService,
    public dialog : MatDialog,
    public cancelDialog : MatDialog
    ) { }

  displayedColumns: string[] = ['id', 'modelo', 'cor', 'ano', 'marca', 'actions'];
  carros: Carro[] = [];
  dataSource = this.carros;

  ngOnInit(): void {
    this.carregarItens();
  }

  carregarItens() {
    this.carroService.listar().subscribe(itens => {
      this.dataSource = itens;
      this.tabela.renderRows();
    })
  }

  openDialog(element: Carro | null) : void {
    const dialogRef = this.dialog.open(CarroDialogComponent, {
      width: '250px',
      data: element !== null ? element : {
        nome: null
      },
    });

    dialogRef.afterClosed().subscribe((result: Carro) => {
      if (result && result.modelo != null && result.modelo !== '') {
        if (result.id) {
          this.carroService.update(result).subscribe(value => {
            this.carregarItens();
          });
        } else {
          this.carroService.incluir(result).subscribe(value => {
            this.carregarItens();
          });
        }
      } else {
        this.tabela.renderRows();
      }
    });
  }

  openDialogDelete(element: Carro | null) : void {
    const dialogRef = this.cancelDialog.open(CancelDialogComponent, {
      width: '250px',
      data: element
    });

    dialogRef.afterClosed().subscribe((result: Carro) => {
      if (result && result != null && result.id !== null) {
        this.carroService.delete(result.id).subscribe(value => {
          this.carregarItens();
        });
      }
    });
  }

  editarItem(element: Carro) {
    this.openDialog(element);
  }

  excluirItem(element: Carro) {
    this.openDialogDelete(element);
  }

}
