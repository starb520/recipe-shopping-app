import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [];
  // private ingredients: Ingredient[] = [
  //   new Ingredient('Apples', 5),
  //   new Ingredient('Tomatoes', 10)
  // ];

  constructor(private http: HttpClient) {}

  getIngredients() {
    // return this.ingredients.slice(); // return a copy of the ingredients array using the slice method
    this.http
      .get<{ message: string; ingredients: Ingredient[] }>('http://localhost:3000/api/ingredients')
      .subscribe((postData) => {
        this.ingredients = postData.ingredients;
        this.ingredientsChanged.next(this.ingredients);
      });
  }

  // returning a specified ingredient by index for editing purposes
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.http
      .post<{ message: string }>('http://localhost:3000/api/ingredients', ingredient)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients);
      });
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
