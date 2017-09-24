import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExсhangeService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private hostUrl = 'http://localhost:3000'; 

  constructor(private http: Http) { }

  changeTickets(
     user1Address: string,
     user2Address: string,
     place1Number: number,
     place2Number: number): Observable<boolean> {
      const url = `${this.hostUrl}/api/tickets/exchange`;
      return this.http
            .post(url, 
              JSON.stringify(
                {
                  firstContractAddress: user1Address,
                  secondContractAddress : user2Address,
                  firstTicketId: place1Number,
                  secondTicketId: place2Number
                })
              , {headers: this.headers})
              .map(res => res.json().isSuccess as boolean);
  }  

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}