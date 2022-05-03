import { CarroComponent } from './views/carro/carro.component';
import { MarcaComponent } from './views/marca/marca.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'marca',
    component: MarcaComponent
  },
  {
    path: 'carro',
    component: CarroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
