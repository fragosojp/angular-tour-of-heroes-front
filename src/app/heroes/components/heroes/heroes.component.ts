import { ConfirmationDialogComponent } from './../../../core/components/confirmation-dialog/confirmation-dialog.component';
import { DialogData } from './../../../core/models/dialog-data.model';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../core/models/Hero';
import { HeroService } from '../../../core/services/hero.service';
import { MatDialog } from '@angular/material/dialog';
//import { MessageService } from '../core/services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  heroes: Hero[] = [];
  // selectedHero?: Hero;

  constructor(private heroService: HeroService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getAll().subscribe((heroes) => (this.heroes = heroes));
  }

  delete(hero: Hero): void {
    const dialogData: DialogData = {
      cancelText: 'Cancel',
      confirmText: 'Delete',
      content: `Delete '${hero.name}' ?`,
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData,
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.heroService.delete(hero).subscribe(() => {
          //Recarregando o backEnd a pos o delete
          this.getHeroes();
          //metodo usado para nao chamar o backend depois de excluir o dado
          //this.heroes = this.heroes.filter((h) => h !== hero);
        });
      }
    });
  }
}
