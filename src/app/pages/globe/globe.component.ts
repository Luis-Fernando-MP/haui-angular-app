import { Component, effect, inject, signal } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { IpLocationService } from '../../services/ip-location.service';
import { Country } from '../../services/country.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-globe',
  standalone: true,
  templateUrl: './globe.component.html',
  styleUrl: './globe.component.scss',
  imports: [CommonModule],
})
export class GlobeComponent {
  private readonly country = inject(CountryService);
  private readonly ipLocation = inject(IpLocationService);

  public countries: Country[] = [];

  public isLoading = signal(true);
  public error = signal<string | null>(null);
  public currentCountry = signal<Country | null>(null);

  constructor() {
    // this.ipLocation.ipInfo$.subscribe((dt) => {
    //   this.currentCountry = dt;
    // });

    const country = this.ipLocation.ipState();
    // effect(() => {
    //   this.currentCountry.set(country);
    //   console.log(country);
    // });

    // this.country.getCountriesByRegion('americas').subscribe((data) => {
    //   this.countries = data;
    //   // this.isLoading = false;
    // });
  }

  // loadCountry() {
  //   this.isLoading.set(true);
  //   this.error.set(null);

  //   this.ipLocation.ipInfo$.subscribe({
  //     next: (country) => {
  //       this.currentCountry.set(country);
  //       this.isLoading.set(false);
  //     },
  //     error: (err) => {
  //       this.error.set('Error al cargar país');
  //       this.isLoading.set(false);
  //     },
  //   });
  // }
}
