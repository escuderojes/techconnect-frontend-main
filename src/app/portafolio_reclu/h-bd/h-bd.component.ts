import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { skillsBd, animateProgress } from './h-bd';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-h-bd',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './h-bd.component.html',
  styleUrls: ['./h-bd.component.css', './circle2.css', './style-sw.css']
})
export class HBdComponent implements AfterViewInit {
  skills = skillsBd;

  ngAfterViewInit(): void {
    animateProgress(this.skills);
  }
}
