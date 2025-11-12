import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

      // private recipes: Recipe[] = [
      //   new Recipe('Test Recipe 1', 'Test Recipe 1 description', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',[ new Ingredient('Meat',1), new Ingredient('French Fries',20)]),
      //   new Recipe('Test Recipe 2', 'Test Recipe 2 description', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', [ new Ingredient('Buns',2), new Ingredient('Meat',1)])
      // ];

      private recipes: Recipe[] = [];

      constructor(private slService: ShoppingListService) {}

      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes() {
        return this.recipes.slice();  // return a copy of the recipes array by using the slice method
      }

      getRecipe(index: number) {
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
}