import { HeroService } from '../../../core/services/hero.service';
import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../../core/models/Hero';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  hero!: Hero;
  isEditing = false;

  form = this.fb.group({
    id: [{ value: 0, disabled: true }],
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
    private location: Location,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const paramId = this.route.snapshot.paramMap.get('id');

    if (paramId !== 'new') {
      this.isEditing = true;
      const id = Number(paramId);
      this.heroService.getOne(id).subscribe((hero) => {
        this.hero = hero;
        console.log(hero.id);
        this.form.controls['id'].setValue(hero.id);
        this.form.controls['name'].setValue(hero.name);
      });
    }
    //console.log(id);
  }

  goBack(): void {
    this.location.back();
  }

  create(): void {
    const { valid, value } = this.form;

    if (valid) {
      const hero: Hero = {
        name: value.name,
      } as Hero;

      this.heroService.create(hero).subscribe(() => this.location.back());
    } else {
      this.shoeErrorMsg();
    }
  }

  update(): void {
    const { valid, value } = this.form;

    if (valid) {
      const hero: Hero = {
        id: this.hero.id,
        name: value.name,
      } as Hero;

      this.heroService.update(hero).subscribe(() => this.location.back());
    } else {
      this.shoeErrorMsg();
    }
  }

  private shoeErrorMsg(): void {
    this.snackBar.open('Please check the errors found.', 'Ok', {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
}
