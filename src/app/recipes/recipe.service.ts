import { Output, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Soup',
      'Some delicious soup',
      'http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/1506120378/MR_0917170472.jpg?itok=KPTNrvis',
      [
        new Ingredient('Chicken', 1),
        new Ingredient('Basil Leaves', 20)
      ]
    ),
    new Recipe(
      'Bacon Cheeseburger',
      'Delicious Quarter Pound Bacon Cheeseburger',
      'https://aht.seriouseats.com/images/2013/07/20130723-bacon-weave-food-lab-burger-step-by-step-26.jpg',
      [
        new Ingredient('Buns', 10),
        new Ingredient('Beef', 2),
        new Ingredient('Bacon', 4)
      ]
    )
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    // this will return a copy of the recipes array
    return this.recipes.slice();
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
}
