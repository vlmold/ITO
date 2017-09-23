import { Component, OnInit} from '@angular/core';

import { TicketsOrg
} from './models/TicketsOrg';
import { TicketsOrgService } from './TicketsOrg.service';
import 'rxjs/add/observable/of';

import {MdIconRegistry} from '@angular/material';
import { MdSnackBar } from '@angular/material';
import {MdDatepickerModule} from '@angular/material';
import {MdDatepicker, MdNativeDateModule} from '@angular/material';
import { DateAdapter, NativeDateAdapter } from '@angular/material';


@Component({
  selector: 'TicketsOrg-component',
  templateUrl: "./TicketsOrg.component.html", 
  providers: [TicketsOrgService]
})

export class TicketsOrgComponent implements OnInit {
    ticketsOrg: TicketsOrg;
    ticketsTypes: string[];
    isCreating: boolean;

    constructor(
        private ticketsOrgService: TicketsOrgService,
        public snackBar: MdSnackBar,
        dateAdapter: DateAdapter<NativeDateAdapter>) {

        dateAdapter.setLocale('de-DE');
        this.ticketsOrg = new TicketsOrg();
    }

    ngOnInit(): void {
        this.initTypes();        
        this.ticketsOrg = new TicketsOrg();        
    }

    createTicketsOrg() : void {
        this.isCreating = true;

        this.ticketsOrgService
            .createTicketsOrg(this.ticketsOrg)
            .subscribe(result => {
                this.snackBar.open("Your contract address - " + result, "Close", {
                    duration: 4000,
                });

                this.isCreating = false;
            });
    }

    initTypes(): void{
        this.ticketsTypes = ["Event", "FlyTicket", "TrainTicket"];
    }
}