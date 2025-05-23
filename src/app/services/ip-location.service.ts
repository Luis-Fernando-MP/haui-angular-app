import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CountryService } from './country.service';
import { IpInfo } from './ip-location.type';
import { Country } from './country.type';
import { LoadState } from '../types/load';

@Injectable({
  providedIn: 'root',
})
export class IpLocationService {
  private readonly apiUrl = 'https://ipapi.co/json/';
  private readonly http = inject(HttpClient);
  private readonly country = inject(CountryService);

  public ipState = signal<LoadState<Country | null>>({
    data: null,
    pending: false,
    error: null,
  });

  constructor() {
    this.loadIpInfo();
  }

  private loadIpInfo() {
    this.ipState.set({ data: null, pending: true, error: null });

    this.http.get<IpInfo>(this.apiUrl).subscribe({
      next: (data) => {
        this.loadCountryInfo(data);
      },
      error: () => {
        this.ipState.set({
          data: null,
          pending: false,
          error: 'No se pudo obtener la información de IP',
        });
      },
    });
  }

  private loadCountryInfo(ipData: IpInfo) {
    this.country.loadCountryByCode(ipData.country_code);
    console.log('data', this.country.countryState());
  }
}
