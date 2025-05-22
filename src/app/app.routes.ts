import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GlobeComponent } from './pages/globe/globe.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'globe',
    component: GlobeComponent,
  },
  {
    path: 'calculator',
    component: CalculatorComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
