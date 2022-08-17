import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjetoFormComponent } from './projeto-form/projeto-form.component';
import { ProjetoListComponent } from './projeto-list/projeto-list.component';

const routes: Routes = [
  { path: '', component: ProjetoListComponent },
  { path: 'novo', component: ProjetoFormComponent },
  { path: ':editar/:id', component: ProjetoFormComponent },
  { path: 'visualizar/:id', component: ProjetoFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjetoRoutingModule {}
