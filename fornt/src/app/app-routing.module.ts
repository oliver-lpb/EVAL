import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListaUsuariosComponent } from './componentes/listaUsuarios/listaUsuarios.component';

const routes: Routes = [
  {
    path:'',
    component:AppComponent
  },
  {
    path:'usuarios',
    component:ListaUsuariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
