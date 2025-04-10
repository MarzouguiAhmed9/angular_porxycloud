import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component'; 
import { SharedModule } from './theme/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [HttpClientModule, SharedModule, AppComponent],
  providers: []
})
export class AppModule {}
