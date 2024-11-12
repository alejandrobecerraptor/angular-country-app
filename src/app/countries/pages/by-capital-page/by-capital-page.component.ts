import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css',
})
export class ByCapitalPageComponent {
  countries: Country[] = [];
  isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {}

  searchByCapital(value: string): void {
    this.isLoading = true;
    this.countriesService.searchCapital(value).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
