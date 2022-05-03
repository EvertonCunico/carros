import { MarcaService } from './marca.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Marca } from './marca';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  @ViewChild(MatTable)
  tabela !: MatTable<any>;

  constructor(private marcaService: MarcaService) { }
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

}
