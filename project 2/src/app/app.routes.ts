import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { ResearchCategoriesComponent } from './pages/research-categories/research-categories.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { VideosComponent } from './pages/videos/videos.component';
import { ProgrammesComponent } from './pages/programmes/programmes.component';
import { FinancementComponent } from './pages/financement/financement.component';
import { CooperationComponent } from './pages/cooperation/cooperation.component';
import { adminRoutes } from './admin/admin.routes';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'article/:id', component: ArticleDetailComponent },
  { path: 'categories', component: ResearchCategoriesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'programs', component: ProgrammesComponent },
  { path: 'funding', component: FinancementComponent },
  { path: 'cooperation', component: CooperationComponent },
  ...adminRoutes,
  { path: '**', redirectTo: '' }
];