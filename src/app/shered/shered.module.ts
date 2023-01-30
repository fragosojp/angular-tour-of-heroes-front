import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';

const SHARED_COMPONENTS = [HeroSearchComponent];

@NgModule({
  declarations: [SHARED_COMPONENTS],
  imports: [CommonModule, MaterialModule],
  exports: [SHARED_COMPONENTS],
})
export class SheredModule {}
