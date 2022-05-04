import { CarroService } from './views/carro/carro.service';
import { MarcaService } from './views/marca/marca.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MarcaComponent } from './views/marca/marca.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CarroComponent } from './views/carro/carro.component';
import { HttpClientModule } from '@angular/common/http';
import { MarcaDialogComponent } from './views/marca/marca-dialog/marca-dialog.component';
import { FormsModule } from '@angular/forms';
import { CancelDialogComponent } from './shared/element/cancel-dialog/cancel-dialog.component';
import { CarroDialogComponent } from './views/carro/carro-dialog/carro-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MarcaComponent,
    CarroComponent,
    MarcaDialogComponent,
    CancelDialogComponent,
    CarroDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [
    MarcaService,
    CarroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
