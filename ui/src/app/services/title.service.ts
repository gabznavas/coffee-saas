import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private readonly baseTitle = "Best Coffee";

  constructor(private titleService: Title) {
    this.setTitle(this.baseTitle);
  }

  setTitle(suffix?: string): void {
    const newTitle = suffix ? `${this.baseTitle} | ${suffix}` : this.baseTitle;
    this.titleService.setTitle(newTitle);
  }
}
