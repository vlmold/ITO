import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {TicketsOrgComponent} from '../ticketsOrg/ticketsOrg.component'
import {BuyerComponent} from '../ticketsBuyer/buyer.component'
import {ExchangeComponent} from '../exchange/exсhange.component'

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'createTicketsOrg', component: TicketsOrgComponent},
  { path: 'buyer', component: BuyerComponent},
  { path: 'exchange', component: ExchangeComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
