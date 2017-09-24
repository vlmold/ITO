import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import {TicketsOrg} from './models/TicketsOrg'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TicketsOrgService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private hostUrl = 'http://localhost:3000'; 

  constructor(private http: Http) { }

 createTicketsOrg(ticketsOrg: TicketsOrg): Observable<string> {
      const url = `${this.hostUrl}/api/contracts`;
      return this.http
            .post(url, this.makeJsonFromTicketsOrg(ticketsOrg), {headers: this.headers})
              .map(res => res.json().address as string);
  }

  private makeJsonFromTicketsOrg(ticketsOrg: TicketsOrg): string{
    return JSON.stringify(
              {
                name: ticketsOrg.Name,
                description : ticketsOrg.Description,
                limit: ticketsOrg.EntriesCount,
                time: ticketsOrg.Time.getTime()
              });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}