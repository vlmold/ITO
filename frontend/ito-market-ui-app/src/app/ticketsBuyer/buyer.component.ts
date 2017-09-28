import { Component, OnInit } from '@angular/core';

import { BuyersService } from './buyer.service';
import { TicketOffer } from './TiketOffer';

import 'rxjs/add/observable/of';

import { MdIconRegistry } from '@angular/material';
import { MdSnackBar } from '@angular/material';
import { MdListModule } from '@angular/material';
import { User } from './User';


@Component({
  selector: 'buyer-component',
  templateUrl: "./buyer.component.html",
  providers: [BuyersService]
})

export class BuyerComponent implements OnInit {
  buyerAddress: string;
  offers: TicketOffer[];
  ticketNumber: number;

  contractCheckAddr: string;
  contractCheckNum: number;
  users: User[];
  user:User;
  constructor(
    private buyerService: BuyersService,
    public snackBar: MdSnackBar
  ) {
  }
  ngOnInit(): void {
    this.getOffers();
    this.getUsers();
  }

  checkTicket(): void {
    this.buyerService.checkUser(this.contractCheckNum, this.contractCheckAddr)
      .then(result => {
        this.snackBar.open("Ticket owner - " + result["name"], "Close", {
          duration: 4000,
        });
      })
  }

  buyTicket(event: any, offer: TicketOffer): void {
    this.buyerService.buyTicket(this.user.address, offer.address, this.ticketNumber)
      .subscribe(result => {
        this.snackBar.open("You've bought a ticket  ", "Close", {
          duration: 4000,
        });
      })
  }

  getOffers(): void {

    this.buyerService
      .getOffers()
      .then(offers => this.offers = offers);
  }
  getUsers(): void {

    this.buyerService
      .getUsers()
      .then(users => this.users = users);
  }

}