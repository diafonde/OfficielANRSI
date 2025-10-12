import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() article!: Article;
  @Input() isFeatured: boolean = false;

  onImageError(event: any) {
    // Fallback to a default image if the original fails to load
    event.target.src = 'assets/images/article1.jpeg';
  }
}