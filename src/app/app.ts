import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { FirebaseRecipesService } from './core/services/firebase-recipes.service';

@Component({
  selector: 'app-root',
  imports: [ButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  // ESTE CODIGO ES SOLO PARA PROBAR QUE SE CARGAN LAS RECETAS
  // BORRALO CUANDO QUIERAS
  private readonly _firebaseRecipesService = inject(FirebaseRecipesService);

  ngOnInit(): void {
    this._firebaseRecipesService.getRecipes().subscribe({
      next: (recipes) => {
        console.log('🚀 ~ App ~ ngOnInit ~ recipes:', recipes);
      },
      error: (error) => {
        console.error('Error loading recipes:', error);
      },
    });
  }
}
