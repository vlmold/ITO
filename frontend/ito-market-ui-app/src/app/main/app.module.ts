import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import {HttpModule}       from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent }         from './app.component';
import {TicketsOrgComponent} from '../ticketsOrg/ticketsOrg.component'
import {TicketsOrgService} from '../ticketsOrg/ticketsOrg.service'
import {BuyerComponent} from '../ticketsBuyer/buyer.component'
import {BuyersService} from '../ticketsBuyer/buyer.service'


import { AppRoutingModule }     from './app-routing.module';

import {MdSelectModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdIconModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdSnackBarModule} from '@angular/material';
import {MdProgressBarModule} from '@angular/material';
import {MdListModule} from '@angular/material';
import {MdDatepickerModule, MdNativeDateModule} from '@angular/material';
import { DateAdapter, NativeDateAdapter } from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    MdSelectModule,
    MdInputModule,
    MdIconModule,
    MdButtonModule,
    MdSnackBarModule,
    MdProgressBarModule,
    MdListModule,
    MdDatepickerModule,
    MdNativeDateModule
  ],
  declarations: [
    AppComponent,
    TicketsOrgComponent, 
    BuyerComponent
  ],
  providers: [
    TicketsOrgService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
