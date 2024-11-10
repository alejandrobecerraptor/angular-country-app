import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
    );
  }

  searchCapital(value: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/capital/${value}`)
      .pipe(catchError(() => of([])));
  }

  searchCountry(value: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/name/${value}`)
      .pipe(catchError(() => of([])));
  }

  searchRegion(value: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/region/${value}`)
      .pipe(catchError(() => of([])));
  }
}
