import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private http: HttpClient) {
    console.log('inicia eel sercio');
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(
      catchError(() => of([])),
      delay(2000)
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  searchCapital(value: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/capital/${value}`).pipe(
      tap((countries) => {
        this.cacheStore.byCapital = { term: value, countries };
      })
    );
  }

  searchCountry(value: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/name/${value}`).pipe(
      tap((countries) => {
        this.cacheStore.byCountry = { term: value, countries };
      })
    );
  }

  searchRegion(value: Region): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/region/${value}`).pipe(
      tap((countries) => {
        this.cacheStore.byRegion = { region: value, countries };
      })
    );
  }
}
