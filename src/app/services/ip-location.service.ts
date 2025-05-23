import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CountryService } from './country.service';
import { IpInfo, IPMixCountry } from './ip-location.type';
import { EMPTY, Observable, catchError, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IpLocationService {
  private readonly apiUrl = 'https://ipapi.co/json';
  private readonly http = inject(HttpClient);
  private readonly country = inject(CountryService);

  public getInfo(): Observable<IPMixCountry> {
    return this.http
      .get<IpInfo>(this.apiUrl)
      .pipe(
        switchMap((ipData) =>
          this.loadCountryInfo(ipData).pipe(
            map((country) => ({ ip: ipData, country }))
          )
        )
      );
  }

  private loadCountryInfo(ipData: IpInfo) {
    return this.country.loadCountryByCode(ipData.country_code);
  }
}
