// Angular core imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from "@angular/common/http"; // For making HTTP requests

// Your components
import { AppComponent } from './app.component'; // Replace this with your actual main component (AppComponent)

// Import other modules you need
import { SharedModule } from './theme/shared/shared.module'; // Example of shared module if needed
import { RouterOutlet } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AdminItemsComponent } from './admin-items/admin-items.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    AdminItemsComponent,
    HttpClientModule
    
    
   
  ],
  imports: [
    BrowserModule, // Necessary for running the app in the browser
    HttpClientModule, // Required for HTTP requests (important for your service)
    SharedModule, // Import your shared module if you have one
    RouterOutlet
  ],
  providers: [],
  bootstrap: [AppComponent], // Bootstraps the main component of your app
})
export class AppModule {}
