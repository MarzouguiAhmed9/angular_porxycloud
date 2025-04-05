import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event/event-list/event-list.component';
import { AddEventComponent } from './event/add-event/add-event.component';
import { UpdateEventComponent } from './event/update-event/update-event.component';
import { SponsorslistComponent } from './sponsors/sponsorslist/sponsorslist.component';
import { AddsponsorsComponent } from './sponsors/addsponsors/addsponsors.component';
import { UpdatesponsorComponent } from './sponsors/updatesponsor/updatesponsor.component';
import { EventsFrontComponent } from './event/events-front/events-front.component';
import { EventDetailsComponent } from './event/event-details/event-details.component';
import { ReservationComponent } from './event/reservation/reservation.component';


const routes: Routes = [
  {path:"list",component:EventListComponent},
  {path:"lists",component:SponsorslistComponent},
  {path:"addevent",component:AddEventComponent},
  {path:"addsponsors",component:AddsponsorsComponent},
  { path: 'events', component: EventsFrontComponent },
  { path: 'event-details/:id', component: EventDetailsComponent },
  { path: 'events/:id/reserve', component: ReservationComponent },

  

  {path:"updateevent/:idEvent",component:UpdateEventComponent},
  {path:"updatesponsor/:idSponsor",component:UpdatesponsorComponent}

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
