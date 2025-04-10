// Angular core imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from "@angular/common/http"; // For making HTTP requests
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Your components
import { AppComponent } from './app.component'; // Replace this with your actual main component (AppComponent)

// Import other modules you need
import { SharedModule } from './theme/shared/shared.module'; // Example of shared module if needed

@NgModule({
  declarations: [
    AppComponent, // Add your components here
  ],
  imports: [
    BrowserModule, // Necessary for running the app in the browser
    HttpClientModule, // Required for HTTP requests (important for your service)
    SharedModule, // Import your shared module if you have one
    FormsModule,
    ReactiveFormsModule,
    // You can add other modules like FormsModule, ReactiveFormsModule, etc.
  ],
  providers: [],
  bootstrap: [AppComponent], // Bootstraps the main component of your app
})
export class AppModule {}
