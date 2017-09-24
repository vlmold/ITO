import { Component, OnInit } from '@angular/core';

import { ExсhangeService } from './exсhange.service';


import { BuyersService } from '../ticketsBuyer/buyer.service';
import { TicketOffer } from '../ticketsBuyer/TiketOffer';

import 'rxjs/add/observable/of';

import { MdIconRegistry } from '@angular/material';
import { MdSnackBar } from '@angular/material';
import { MdListModule } from '@angular/material';


@Component({
  selector: 'exсhange-component',
  templateUrl: "./exсhange.component.html",
  providers: [ExсhangeService, BuyersService]
})

export class ExchangeComponent implements OnInit {
  buyerAddress: string;
  ticketNumber: number;
  offers: TicketOffer[];

  userAddr1: string;
  userAddr2: string;

  placeNumber1: number;
  placeNumber2: number;

  constructor(
    private exService: ExсhangeService,
    public snackBar: MdSnackBar,
    private buyerService: BuyersService,
  ) {
  }
  ngOnInit(): void {
    this.getAddresses();
  }

  switch(event: any): void {
    this.exService.changeTickets(this.userAddr1, this.userAddr2, this.placeNumber1, this.placeNumber2)
      .subscribe(result => {
        if (result) {
          this.snackBar.open("You've changed the tickets - ", "Close", {
            duration: 4000,
          });
        }
      })
  }

  getAddresses(): void {
       this.offers = [
      {
        name: "Kiev-NY",
        address: "asd123123123"
      },
      {
        name: "Ledy-Gaga",
        address: "asd123123123"
      }
    ];
    this.buyerService
        .getOffers()
        .then(offers => this.offers = offers);
  }

}