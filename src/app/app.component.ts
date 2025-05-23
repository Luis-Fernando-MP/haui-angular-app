import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {
  LucideAngularModule,
  Globe,
  Calculator,
  Github,
  Figma,
} from 'lucide-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly GithubIcon = Github;
  protected readonly FigmaIcon = Figma;
  protected readonly GlobeIcon = Globe;
  protected readonly CalculatorIcon = Calculator;

  title = 'haui-app-curso';
}
