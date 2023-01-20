import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { HeroesModule } from './heroes/heroes.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    //@angular
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,

    //features
    DashboardModule,
    HeroesModule,

    //app
    CoreModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
