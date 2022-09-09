import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../shared/client.model';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private URL: string = 'https://api-crud-angular.vercel.app/api/clients';

  constructor(private http: HttpClient) {}

  getMethod(): Observable<Client[]> {
    return this.http.get<Client[]>(this.URL).pipe(take(1));
  }

  getByIdMethod(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.URL}/${id}`).pipe(take(1));
  }

  private postMethod(client: Client): Observable<Client> {
    return this.http.post<Client>(this.URL, client).pipe();
  }

  private putMethod(client: Client): Observable<Client> {
    return this.http
      .put<Client>(`${this.URL}/${client._id}`, client)
      .pipe(take(1));
  }

  deleteMethod(_id: string): Observable<Client> {
    return this.http.delete<Client>(`${this.URL}/${_id}`).pipe(take(1));
  }

  saveMethod(client: Client): Observable<Client> {
    if (client._id) {
      return this.putMethod(client);
    } else {
      return this.postMethod(client);
    }
  }
}
