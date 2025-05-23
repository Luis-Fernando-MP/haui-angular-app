import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Country } from './country.type';
import { LoadState } from '../types/load';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly apiUrl = 'https://restcountries.com/v3.1';
  private readonly http = inject(HttpClient);

  public countriesState = signal<LoadState<Country[]>>({
    data: [],
    pending: false,
    error: null,
  });

  public countryState = signal<LoadState<Country | null>>({
    data: null,
    pending: false,
    error: null,
  });

  getCountriesByRegion(region: string) {
    this.countriesState.set({ data: [], pending: true, error: null });

    const client = this.http.get<Country[]>(`${this.apiUrl}/region/${region}`);

    client.subscribe({
      next: (data) => {
        const result = data ?? [];
        this.countriesState.set({ data: result, pending: false, error: null });
      },
      error: () =>
        this.countriesState.set({
          data: [],
          pending: false,
          error: 'Error cargando países',
        }),
    });
  }

  loadCountryByCode(code: string) {
    this.countryState.set({ data: null, pending: true, error: null });
    const client = this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`);

    client.subscribe({
      next: (data) => {
        const result = data[0] ?? [];
        this.countryState.set({ data: result, pending: false, error: null });
      },
      error: () =>
        this.countryState.set({
          data: null,
          pending: false,
          error: 'Error cargando país',
        }),
    });
  }
}
