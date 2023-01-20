import { HeroDetailComponent } from './heroes/components/hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/components/heroes/heroes.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
