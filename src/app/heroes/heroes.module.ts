import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { HeroesRoutingModule } from './heroes-routing.module';

@NgModule({
  declarations: [HeroesComponent, HeroDetailComponent],
  imports: [CommonModule, MaterialModule, FormsModule, HeroesRoutingModule],
})
export class HeroesModule {}
