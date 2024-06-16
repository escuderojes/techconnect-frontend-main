import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { skillsB, animateProgress } from './h-pro';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-h-pro',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './h-pro.component.html',
  styleUrls: ['./h-pro.component.css', './circle.css']
})
export class HProComponent implements AfterViewInit {
  skills = skillsB;

  ngAfterViewInit(): void {
    animateProgress(this.skills);
  }
}
