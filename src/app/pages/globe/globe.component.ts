import { Component, inject, OnInit, signal } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { IpLocationService } from '../../services/ip-location.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { catchError, EMPTY, Observable } from 'rxjs';
import { IPMixCountry } from '../../services/ip-location.type';
import { Country } from '../../services/country.type';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-globe',
  standalone: true,
  templateUrl: './globe.component.html',
  styleUrl: './globe.component.scss',
  imports: [AsyncPipe, CommonModule, ReactiveFormsModule],
})
export class GlobeComponent implements OnInit {
  private readonly country = inject(CountryService);
  private readonly ipLocation = inject(IpLocationService);

  protected countries!: Observable<Country[]>;
  protected currentCountry!: Observable<IPMixCountry>;

  protected americaCountries: Country[] = [];
  protected europaCountries: Country[] = [];

  protected errorLoadCountry!: string;
  protected errorLoadCountries!: string;

  protected isFlying = false;

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.form().valid) return;
    this.isFlying = true;

    setTimeout(() => {
      this.isFlying = false;
    }, 1000);
  }

  protected form = signal(
    new FormGroup({
      fromCountry: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      toCountry: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    })
  );

  ngOnInit(): void {
    this.currentCountry = this.ipLocation.getInfo().pipe(
      catchError((error: string) => {
        this.errorLoadCountry = error;
        return EMPTY;
      })
    );

    this.ipLocation.getInfo().subscribe((data) => {
      this.form()
        .get('fromCountry')
        ?.setValue(data.country[0].name.common ?? '');
    });

    this.countries = this.country.getAllCountries().pipe(
      catchError((error: string) => {
        this.errorLoadCountries = error;
        return EMPTY;
      })
    );

    this.country.getAllCountries().subscribe((data) => {
      this.americaCountries = data.filter(
        (c) =>
          (c.region === 'Americas' && c.subregion?.includes('South America')) ||
          c.subregion?.includes('Central America') ||
          c.subregion?.includes('Caribbean')
      );

      this.europaCountries = data.filter((c) => c.region === 'Europe');
    });
  }
}
