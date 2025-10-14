import { Component, HostListener, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
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
export class TopBarComponent implements OnInit, OnDestroy {
  scrolled = false;
  currentLang = 'fr';
  isLangDropdownOpen = false;
  isMobileMenuOpen = false;

  constructor(public translate: TranslateService) {}

  ngOnInit() {
    console.log('TopBarComponent ngOnInit - setting up functions');
    // Make pure JavaScript functions available globally
    (window as any).toggleMobileMenuJS = () => this.toggleMobileMenuJS();
    (window as any).toggleLangDropdownJS = () => this.toggleLangDropdownJS();
    (window as any).switchLanguageJS = (lang: string) => this.switchLanguageJS(lang);
    console.log('Functions set up:', {
      toggleMobileMenuJS: typeof (window as any).toggleMobileMenuJS,
      toggleLangDropdownJS: typeof (window as any).toggleLangDropdownJS,
      switchLanguageJS: typeof (window as any).switchLanguageJS
    });
  }

  ngOnDestroy() {
    // Clean up global functions
    delete (window as any).toggleMobileMenuJS;
    delete (window as any).toggleLangDropdownJS;
    delete (window as any).switchLanguageJS;
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrolled = window.scrollY > 20;
  }

  @HostListener('window:resize')
  onWindowResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
      this.isMobileMenuOpen = false;
      this.isLangDropdownOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.language-dropdown');
    const mobileMenuToggle = target.closest('.mobile-menu-toggle');
    const mobileQuickLinks = target.closest('.mobile-quick-links');
    
    if (!dropdown) {
      this.isLangDropdownOpen = false;
    }
    
    // Close mobile menu when clicking outside
    if (!mobileMenuToggle && !mobileQuickLinks && this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
    }
  }

  switchLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    this.isLangDropdownOpen = false;
  }

  toggleLangDropdown() {
    console.log('Language dropdown toggle clicked, current state:', this.isLangDropdownOpen);
    this.isLangDropdownOpen = !this.isLangDropdownOpen;
    console.log('Language dropdown new state:', this.isLangDropdownOpen);
  }

  getLanguageFlag(lang: string): string {
    const flags: { [key: string]: string } = {
      'fr': '🇫🇷',
      'ar': '🇲🇷',
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
    console.log('Mobile menu toggle clicked, current state:', this.isMobileMenuOpen);
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    console.log('Mobile menu new state:', this.isMobileMenuOpen);
    
    // Force change detection
    setTimeout(() => {
      console.log('Menu state after timeout:', this.isMobileMenuOpen);
    }, 100);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  isMobile(): boolean {
    return window.innerWidth <= 768;
  }


  // Pure JavaScript methods for mobile interactions
  toggleMobileMenuJS() {
    console.log('toggleMobileMenuJS called - current state:', this.isMobileMenuOpen);
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    console.log('toggleMobileMenuJS - new state:', this.isMobileMenuOpen);
    
    // Force UI update
    const menuElement = document.querySelector('.mobile-quick-links');
    if (menuElement) {
      if (this.isMobileMenuOpen) {
        menuElement.classList.add('expanded');
        console.log('Added expanded class');
      } else {
        menuElement.classList.remove('expanded');
        console.log('Removed expanded class');
      }
    } else {
      console.log('Menu element not found!');
    }
  }

  toggleLangDropdownJS() {
    this.isLangDropdownOpen = !this.isLangDropdownOpen;
    
    // Force UI update
    const dropdownElement = document.querySelector('.lang-dropdown-menu.mobile');
    if (dropdownElement) {
      if (this.isLangDropdownOpen) {
        dropdownElement.classList.add('show');
      } else {
        dropdownElement.classList.remove('show');
      }
    }
  }

  switchLanguageJS(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    this.isLangDropdownOpen = false;
    
    // Force UI update
    const dropdownElement = document.querySelector('.lang-dropdown-menu.mobile');
    if (dropdownElement) {
      dropdownElement.classList.remove('show');
    }
  }
}
