import { HeroService } from '../core/services/hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../core/models/Hero';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService
      .getAll()
      .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
  }

  onSelected(hero: Hero): void {
    this.router.navigate(['/heroes', hero.id]);
  }
}
