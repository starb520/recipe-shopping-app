import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
      recipeSelected = new EventEmitter<Recipe>();

      private recipes: Recipe[] = [
        new Recipe('Test Recipe 1', 'Test Recipe 1 description', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',[ new Ingredient('Meat',1), new Ingredient('French Fries',20)]),
        new Recipe('Test Recipe 2', 'Test Recipe 2 description', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', [ new Ingredient('Buns',2), new Ingredient('Meat',1)])
      ];

      constructor(private slService: ShoppingListService) {}

      getRecipes() {
        return this.recipes.slice();  // return a copy of the recipes array by using the slice method
      }

      getRecipe(index: number) {
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }
}