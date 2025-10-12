import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import * as AOS from 'aos';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TopBarComponent,
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class App {
  constructor(public translate: TranslateService) {
    translate.addLangs(['fr', 'ar']);
    translate.setDefaultLang('fr');
    translate.use('fr');
  }
  switchLang(lang: string) {
    this.translate.use(lang);
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  ngOnInit() {
    AOS.init({
      duration: 3000,
      once: false, // animation occurs only once
    });
  }
}