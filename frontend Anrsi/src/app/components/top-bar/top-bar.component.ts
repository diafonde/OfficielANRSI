import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslateModule],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  scrolled = false;
  currentLang = 'fr';
  isLangDropdownOpen = false;

  constructor(public translate: TranslateService) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrolled = window.scrollY > 20;
  }

  switchLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    this.isLangDropdownOpen = false;
  }

  toggleLangDropdown() {
    this.isLangDropdownOpen = !this.isLangDropdownOpen;
  }
}
