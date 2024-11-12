import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';
@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
})
export class ByRegionPageComponent {
  countries: Country[] = [];
  regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  selectedRegion?: Region;
  isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {}

  searchByRegion(value: Region): void {
    this.isLoading = true;
    this.selectedRegion = value;
    this.countriesService.searchRegion(value).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
