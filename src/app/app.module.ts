// Angular core imports
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from "@angular/common/http"; // For making HTTP requests
import { ClientComponent } from './client/client.component'; // Import your component here
// Your components
import { AppComponent } from './app.component'; // Replace this with your actual main component (AppComponent)

// Import other modules you need
import { SharedModule } from './theme/shared/shared.module'; // Example of shared module if needed

@NgModule({
  declarations: [
    // Add your components here
     // Declare your component here
  ],
  imports: [
    AppComponent, // Import your standalone component here
    BrowserAnimationsModule, // Necessary for running the app in the browser with animations
    HttpClientModule, // Required for HTTP requests (important for your service)
    SharedModule,
    ClientComponent,
    // Import your shared module if you have one
    // You can add other modules like FormsModule, ReactiveFormsModule, etc.
  ],
  providers: [],
  // Removed bootstrap array as AppComponent is a standalone component
})
export class AppModule {}
