import { Component, OnInit } from '@angular/core';

import { BuyersService } from './buyer.service';
import { TicketOffer } from './TiketOffer';

import 'rxjs/add/observable/of';

import { MdIconRegistry } from '@angular/material';
import { MdSnackBar } from '@angular/material';
import { MdListModule } from '@angular/material';


@Component({
  selector: 'buyer-component',
  templateUrl: "./buyer.component.html",
  providers: [BuyersService]
})

export class BuyerComponent implements OnInit {
  buyerAddress: string;
  offers: TicketOffer[];
  ticketNumber: number;

  constructor(
    private buyerService: BuyersService,
    public snackBar: MdSnackBar
  ) {
  }
  ngOnInit(): void {
    this.getOffers();
  }

  buyTicket(event: any, offer: TicketOffer): void {
    this.buyerService.buyTicket(this.buyerAddress, offer.address, this.ticketNumber)
      .subscribe(result => {
          this.snackBar.open("You've bought a ticket - ", "Close", {
            duration: 4000,
          });        
      })
  }

  getOffers(): void {
    // this.offers = [
    //   {
    //     name: "Kiev-NY",
    //     address: "asd123123123"
    //   },
    //   {
    //     name: "Ledy-Gaga",
    //     address: "asd123123123"
    //   }
    // ];
    this.buyerService
        .getOffers()
        .then(offers => this.offers = offers);
  }

}