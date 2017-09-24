import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { TicketOffer } from './TiketOffer';

@Injectable()
export class BuyersService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private hostUrl = 'http://localhost:3000'; 

  constructor(private http: Http) { }

  checkUser(id:number, contractAddress:string): Promise<string>{
    const url = `${this.hostUrl}/api/tickets?id=${id}&contractAddress=${contractAddress}`;
    return this.http.get(url)
          .toPromise()
          .then(response =>  response.text() as string);
  }

  buyTicket(userAddress: string, contractAddress: string, placeNumber: number): Observable<boolean> {
      const url = `${this.hostUrl}/api/tickets`;
      return this.http
            .post(url, 
              JSON.stringify(
                {
                  userAddress: userAddress,
                  contractAddress : contractAddress,
                  ticketId: placeNumber
                })
              , {headers: this.headers})
              .map(res => res.json().isSuccess as boolean);
  }  

  getOffers(): Promise<TicketOffer[]> {
    const url = `${this.hostUrl}/api/contracts`;
    return this.http.get(url)
          .toPromise()
          .then(response => response.json() as TicketOffer[]);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}