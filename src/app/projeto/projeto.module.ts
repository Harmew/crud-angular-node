import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetoRoutingModule } from './projeto-routing.module';
import { ProjetoFormComponent } from './projeto-form/projeto-form.component';
import { ProjetoListComponent } from './projeto-list/projeto-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProjetoFormComponent, ProjetoListComponent],
  imports: [
    CommonModule,
    ProjetoRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
})
export class ProjetoModule {}
