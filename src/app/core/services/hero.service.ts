import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hero } from '../models/Hero';
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
      .get<Hero>(this.getUrl(id))
      .pipe(tap((hero) => this.log(`Fetched ${this.descAttibutes(hero)}`)));
  }
  //Get / heores?name=term
  search(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http
      .get<Hero[]>(`${this.heroesUrl}?name=${term}`)
      .pipe(
        tap((heroes) =>
          heroes.length
            ? this.log(`found ${heroes.length} Hero(s) matching "${term}"`)
            : this.log(`no Hero(s) matching "${term}"`)
        )
      );
  }

  // POST / Heroes
  create(hero: Hero): Observable<Hero> {
    return this.http
      .post<Hero>(this.heroesUrl, hero)
      .pipe(tap((hero) => this.log(`created ${this.descAttibutes(hero)}`)));
  }
  // PUT/ Heroes/id
  update(hero: Hero): Observable<Hero> {
    return this.http
      .put<Hero>(this.getUrl(hero.id), hero)
      .pipe(tap((hero) => this.log(`updated ${this.descAttibutes(hero)}`)));
  }

  //DELETE / Herois/id
  delete(hero: Hero): Observable<any> {
    return this.http
      .delete<any>(this.getUrl(hero.id))
      .pipe(tap(() => this.log(`Deleted ${this.descAttibutes(hero)}`)));
  }

  private descAttibutes(hero: Hero): string {
    return `Hero ID=${hero.id} & NAME=${hero.name}`;
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  private getUrl(id: number): string {
    return `${this.heroesUrl}/${id}`;
  }
}
