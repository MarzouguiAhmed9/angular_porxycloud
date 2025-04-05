import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventListComponent } from './event/event-list/event-list.component';
import { AddEventComponent } from './event/add-event/add-event.component';
import { UpdateEventComponent } from './event/update-event/update-event.component';
import { SponsorslistComponent } from './sponsors/sponsorslist/sponsorslist.component';
import { AddsponsorsComponent } from './sponsors/addsponsors/addsponsors.component';
import { UpdatesponsorComponent } from './sponsors/updatesponsor/updatesponsor.component';
import { EventService } from './event/services/event.service';
import { ServicesponsorsService } from './sponsors/servicesponsors.service';
import { EventsFrontComponent } from './event/events-front/events-front.component';
import { EventDetailsComponent } from './event/event-details/event-details.component';
import { EventReviewComponent } from './event/event-review/event-review.component';
import { ReservationComponent } from './event/reservation/reservation.component';
import { SeatSelectionComponent } from './event/seat-selection/seat-selection.component';


@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    AddEventComponent,
    UpdateEventComponent,
    SponsorslistComponent,
    AddsponsorsComponent,
    UpdatesponsorComponent,
    EventsFrontComponent,
    EventDetailsComponent,
    EventReviewComponent,
    ReservationComponent,
    SeatSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [EventService,
    ServicesponsorsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
