import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  //Rotas Staticas
  { path: '', pathMatch: 'full', component: HomeComponent },
  //Rotas dinamicas lazy loading
  {
    path: 'projeto',
    loadChildren: () =>
      import('./projeto/projeto.module').then((m) => m.ProjetoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
