import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Country } from './country.type';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly apiUrl = 'https://restcountries.com/v3.1';
  private readonly http = inject(HttpClient);

  getCountriesByRegion(region: string) {
    return this.http.get<Country[]>(`${this.apiUrl}/region/${region}`);
  }

  getAllCountries() {
    return this.http.get<Country[]>(`${this.apiUrl}/all/`);
  }

  loadCountryByCode(code: string) {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`);
  }
}
