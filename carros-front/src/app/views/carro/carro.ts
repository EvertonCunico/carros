import { Marca } from './../marca/marca';
export interface Carro {
  id: number,
  modelo: string,
  ano: number,
  marca: Marca,
  cor: string
}
