import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hero } from '../models/hero.model';
import { LoadingService } from './loading.service';
import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = `${environment.baseUrl}/heroes`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private loadingService: LoadingService
  ) {}

  //GET   /heroes
  getAll(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(tap((heroes) => this.log(`fetched ${heroes.length} Hero(es)`)));
  }

  //GET   /heroes/id
  getOne(id: number): Observable<Hero> {
    return this.http
      .get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap((hero) => this.log(`Fetched hero id=${id} and name=${hero.name}`))
      );
  }

  // PUT/ Heroes/id
  update(hero: Hero): Observable<Hero> {
    return this.http
      .put<Hero>(`${this.heroesUrl}/${hero.id}`, hero)
      .pipe(
        tap((hero) =>
          this.log(`updated hero id=${hero.id} and name=${hero.name}`)
        )
      );
  }
  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }
}
