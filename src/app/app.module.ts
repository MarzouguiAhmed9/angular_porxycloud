// Angular core imports
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from "@angular/common/http"; // For making HTTP requests

// Your components
import { AppComponent } from './app.component'; // Replace this with your actual main component (AppComponent)

// Import other modules you need
import { SharedModule } from './theme/shared/shared.module'; // Example of shared module if needed

@NgModule({
  declarations: [
    AppComponent, // Add your components here
  ],
  imports: [
    BrowserAnimationsModule, // Necessary for running the app in the browser with animations
    HttpClientModule, // Required for HTTP requests (important for your service)
    SharedModule, // Import your shared module if you have one
    // You can add other modules like FormsModule, ReactiveFormsModule, etc.
  ],
  providers: [],
  bootstrap: [AppComponent], // Bootstraps the main component of your app
})
export class AppModule {}
