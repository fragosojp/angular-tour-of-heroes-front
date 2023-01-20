import { Component, OnInit } from '@angular/core';
import { Hero } from '../core/models/hero.model';
import { HeroService } from '../core/services/hero.service';
import { MessageService } from '../core/services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  heroes: Hero[] = [];
  // selectedHero?: Hero;

  constructor(
    private heroService: HeroService // private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
    // this.heroService.getHeroes().subscribe(
    //   (value) => console.log(value),
    //   (err) => console.log(err),
    //   () => console.log('houve um erro')
    // );
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponet: Selected hero id=${hero.id}`);
  // }
}
