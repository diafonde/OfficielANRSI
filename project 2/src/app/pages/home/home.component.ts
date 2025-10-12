import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { ArticleService } from '../../services/article.service';
import { ANRSIDataService, ANRSIArticle, ANRSIEvent, ANRSIVideo } from '../../services/anrsi-data.service';
import { Article } from '../../models/article.model';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, HeroSectionComponent, ArticleCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredArticles: Article[] = [];
  latestArticles: Article[] = [];
  anrsiArticles: ANRSIArticle[] = [];
  upcomingEvents: ANRSIEvent[] = [];
  featuredVideos: ANRSIVideo[] = [];
  
  researchAreas = [
    {
      name: 'Agriculture et Sécurité Alimentaire',
      description: 'Développement de solutions innovantes pour l\'agriculture durable et la sécurité alimentaire.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>'
    },
    {
      name: 'Énergies Renouvelables',
      description: 'Recherche et développement dans le domaine des énergies propres et durables.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v10M2 12h20"></svg>'
    },
    {
      name: 'Santé et Médecine',
      description: 'Innovation médicale et recherche pharmaceutique pour améliorer les soins de santé.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>'
    },
    {
      name: 'Technologies de l\'Information',
      description: 'Développement de solutions numériques et d\'intelligence artificielle.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/><path d="M7 13.5h10"/></svg>'
    }
  ];
  
  timelineItems = [
    {
      year: '2025',
      title: 'ICTW-FSTCA 2025',
      description: 'Conférence internationale sur la transformation des systèmes alimentaires pour l\'action climatique.'
    },
    {
      year: '2025',
      title: 'COMSTECH-UTS Workshop',
      description: 'Workshop international sur les énergies renouvelables : Affordable & Clean Energy for ALL.'
    },
    {
      year: '2025',
      title: 'Participation SEE PAKISTAN',
      description: 'Participation mauritanienne à l\'événement international SEE PAKISTAN à Lahore.'
    },
    {
      year: '2020',
      title: 'Création de l\'ANRSI',
      description: 'Fondation de l\'Agence Nationale de la Recherche Scientifique et de l\'Innovation.'
    }
  ];

  partners = [
    { name: 'Mauritanie', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Flag_of_Mauritania.svg' },
    { name: 'Pakistan', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg' },
    { name: 'Japon', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg' },
    { name: 'Sénégal', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Flag_of_Senegal.svg' },
  ];

  constructor(
    private articleService: ArticleService,
    private anrsiDataService: ANRSIDataService
  ) {}

  ngOnInit(): void {
    AOS.init();
    
    // Load original articles
    this.articleService.getFeaturedArticles().subscribe(articles => {
      this.featuredArticles = articles;
    });
    
    this.articleService.getRecentArticles().subscribe(articles => {
      this.latestArticles = articles;
    });
    
    // Load ANRSI data
    this.anrsiArticles = this.anrsiDataService.getFeaturedArticles();
    this.upcomingEvents = this.anrsiDataService.getUpcomingEvents();
    this.featuredVideos = this.anrsiDataService.getVideos().slice(0, 3);
  }
}