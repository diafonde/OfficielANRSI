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
  isMobileMenuOpen = false;

  constructor(public translate: TranslateService) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrolled = window.scrollY > 20;
  }

  @HostListener('window:resize')
  onWindowResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
      this.isMobileMenuOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.language-dropdown');
    
    if (!dropdown) {
      this.isLangDropdownOpen = false;
    }
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

  getLanguageFlag(lang: string): string {
    const flags: { [key: string]: string } = {
      'fr': '🇫🇷',
      'ar': '🇲🇦',
      'en': '🇺🇸'
    };
    return flags[lang] || '🇺🇸';
  }

  getLanguageName(lang: string): string {
    const names: { [key: string]: string } = {
      'fr': 'Fr',
      'ar': 'ar',
      'en': 'En'
    };
    return names[lang] || 'En';
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}
