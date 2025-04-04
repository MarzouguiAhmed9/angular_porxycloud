// Angular core imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from "@angular/common/http"; // For making HTTP requests

// Your components
import { AppComponent } from './app.component'; // Replace this with your actual main component (AppComponent)

// Import other modules you need
import { SharedModule } from './theme/shared/shared.module'; // Example of shared module if needed

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, // Required for HTTP requests (important for your service)
    SharedModule, // Import your shared module if you have one
    AppComponent, // Import standalone component here
    // You can add other modules like FormsModule, ReactiveFormsModule, etc.
  ],
  providers: [],
  // Removed bootstrap array as AppComponent is a standalone component
})
export class AppModule {}
