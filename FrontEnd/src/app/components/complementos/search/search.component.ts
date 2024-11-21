import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor () {}

  search = new FormControl('');
  searchResults: any[] = [];

  ngOnInit() {
    this.search.valueChanges.pipe(debounceTime(2000)).subscribe(value => {
      if (value !== null && value.trim() !== '') {
        this.searchContent(value.trim());
      } else {
        this.searchResults = [];
      }
    });
  }

  searchContent(value: string) {
    const elements = document.getElementsByClassName('buscable') as HTMLCollectionOf<HTMLElement>;
    this.searchResults = Array.from(elements).filter((element: HTMLElement) => {
      return element.textContent?.toLowerCase().includes(value.toLowerCase());
    });
  }

  redirectToResult(result: HTMLElement) {
    const link = result.querySelector('a');
    if (link) {
      const href = link.getAttribute('href');
      if (href) {
        window.location.href = href;
      }
    }
  }

  @Output('search') searchEmitter = new EventEmitter<string>();
  
}