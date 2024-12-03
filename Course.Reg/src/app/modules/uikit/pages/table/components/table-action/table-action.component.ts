import { Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { SearchService } from '../services/search.service';


@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuery = new BehaviorSubject<string>(''); // Observable for the search query
  searchQuery$ = this.searchQuery.asObservable();

  updateSearchQuery(query: string) {
    this.searchQuery.next(query); // Updates the search query
  }
}

@Component({
  selector: 'app-table-action',
  standalone: true,
  imports: [AngularSvgIconModule],
  templateUrl: './table-action.component.html',
  styleUrl: './table-action.component.scss',
})
export class TableActionComponent {
  constructor(private searchService: SearchService) {}

  onSearch(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value || '';
    console.log('Search query:', inputValue);
    this.searchService.updateSearchQuery(inputValue); // Send search query to the service
    console.log(inputValue);
  }
}



