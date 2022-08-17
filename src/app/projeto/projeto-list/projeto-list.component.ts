import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Client } from 'src/app/shared/client.model';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-projeto-list',
  templateUrl: './projeto-list.component.html',
  styleUrls: ['./projeto-list.component.scss'],
})
export class ProjetoListComponent implements OnInit {
  clients$: Observable<Client[]> = new Observable<Client[]>();
  error: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.error = false;
    this.onReload();
  }

  onReload(): void {
    this.clients$ = this.clientService.getMethod().pipe(
      catchError(() => {
        this.error = true;
        return EMPTY;
      })
    );
  }

  onEdit(id: string): void {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(client: Client): void {
    if (this.onConfirmDelete()) {
      this.clientService.deleteMethod(client._id).subscribe(() => {
        this.onReload();
      });
    } else {
      return;
    }
  }

  onConfirmDelete(): boolean {
    return confirm('Deseja realmente excluir este cliente?');
  }
}
