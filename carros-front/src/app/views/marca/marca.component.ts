import { CancelDialogComponent } from './../../shared/element/cancel-dialog/cancel-dialog.component';
import { MarcaDialogComponent } from './marca-dialog/marca-dialog.component';
import { MarcaService } from './marca.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Marca } from './marca';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  @ViewChild(MatTable)
  tabela !: MatTable<any>;

  constructor(
    private marcaService: MarcaService,
    public dialog : MatDialog,
    public cancelDialog : MatDialog
    ) { }
  displayedColumns: string[] = ['id', 'nome', 'actions'];
  marcas: Marca[] = [];
  dataSource = this.marcas;

  ngOnInit(): void {
    this.carregarItens();
  }

  carregarItens() {
    this.marcaService.listar().subscribe(itens => {
      this.dataSource = itens;
      this.tabela.renderRows();
    })
  }

  openDialog(element: Marca | null) : void {
    const dialogRef = this.dialog.open(MarcaDialogComponent, {
      width: '250px',
      data: element !== null ? element : {
        nome: null
      },
    });

    dialogRef.afterClosed().subscribe((result: Marca) => {
      if (result && result.nome != null && result.nome !== '') {
        if (result.id) {
          this.marcaService.update(result).subscribe(value => {
            this.carregarItens();
          });
        } else {
          this.marcaService.incluir(result).subscribe(value => {
            this.carregarItens();
          });
        }
      } else {
        this.tabela.renderRows();
      }
    });
  }

  openDialogDelete(element: Marca | null) : void {
    const dialogRef = this.cancelDialog.open(CancelDialogComponent, {
      width: '250px',
      data: element
    });

    dialogRef.afterClosed().subscribe((result: Marca) => {
      if (result && result != null && result.id !== null) {
        this.marcaService.delete(result.id).subscribe(value => {
          this.carregarItens();
        });
      }
    });
  }

  editarItem(element: Marca) {
    this.openDialog(element);
  }

  excluirItem(element: Marca) {
    this.openDialogDelete(element);
  }



}
