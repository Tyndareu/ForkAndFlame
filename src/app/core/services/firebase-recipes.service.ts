import { Injectable, inject, signal } from '@angular/core';
import {
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  limit,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, tap } from 'rxjs';

import { COLLECTION_RECIPES } from '../constants/constants';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseRecipesService {
  /** Injects the Firestore service */
  private readonly _firestore = inject(Firestore);

  /** Signal for the current recipe */
  public readonly $recipe = signal<Recipe | null>(null);

  /** Signal for the recipes list */
  public readonly $recipes = signal<Recipe[]>([]);

  /** Gets the list of active recipes */
  public getRecipes(): Observable<Recipe[]> {
    const recipesRef = collection(this._firestore, COLLECTION_RECIPES);
    const recipesQuery = query(recipesRef, where('status', '==', 'active'), limit(500));
    return (collectionData(recipesQuery, { idField: 'id' }) as Observable<Recipe[]>).pipe(
      tap((response) => this.$recipes.set(response)),
    );
  }

  /** Gets a recipe by ID */
  public getRecipe(recipeID: string): Observable<Recipe> {
    const ref = doc(this._firestore, `${COLLECTION_RECIPES}/${recipeID}`);
    return docData(ref) as Observable<Recipe>;
  }

  /** Adds a new recipe */
  public addRecipe(newRecipe: Recipe): Promise<DocumentReference> {
    const ref = collection(this._firestore, COLLECTION_RECIPES);
    return addDoc(ref, newRecipe);
  }

  /** Edits an existing recipe */
  public editRecipe(recipeID: string, data: Recipe): Promise<void> {
    const ref = doc(this._firestore, `${COLLECTION_RECIPES}/${recipeID}`);
    return setDoc(ref, data);
  }
}
