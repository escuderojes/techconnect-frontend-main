import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { skillsBd, animateProgress, Skill } from './h-bd';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-h-bd',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './h-bd.component.html',
  styleUrls: ['./h-bd.component.css', './circle2.css', './style-sw.css']
})
export class HBdComponent implements AfterViewInit {
  skills: Skill[] = [];

  constructor() {
    this.skills = skillsBd; // Asigna las habilidades en el constructor
  }

  ngAfterViewInit(): void {
    // Verifica si 'skills' está correctamente inicializado
    console.log(this.skills);

    // Llama a 'animateProgress' con las habilidades correctamente inicializadas
    animateProgress(this.skills);
  }
}
