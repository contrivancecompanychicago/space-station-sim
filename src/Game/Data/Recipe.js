// @flow
import type {IngredientType} from 'Game/Data/Ingredient'
import {Ingredient} from 'Game/Data/Ingredient';

import DataMap from 'Game/Data/Map'

export type RecipeType = string;
export type RecipeDataType = {
    label:string,
    ingredients: Array<IngredientType>,
}

const recipeData:DataMap<RecipeType, RecipeDataType> = new DataMap();
export default recipeData;
recipeData.put('GARLIC', {label:'garlic', ingredients:[
    Ingredient.GARLIC,
]})
recipeData.put('GARLICCHEESE', {label:'garlic cheese', ingredients:[
    Ingredient.GARLIC,
    Ingredient.MOZZARELLA,
]})
recipeData.put('GARLICCHEESE', {label:'garlic cheese', ingredients:[
    Ingredient.SAUCE,
    Ingredient.MOZZARELLA,
    Ingredient.OREGANO,
]})


// recipes:{
//     garlic: {
//         garlic
//     }
//     garliccheese{
//         garlic
//         mozzarella
//     }
//     margherita:{
//         sauce
//         mozzarella
//         oregano
//     }
//     americana: {
//         tomato sauce
//         salami
//         mozzarella
//         oregano
//     }
//     hawaiian: {
//         sauce
//         mozzarella
//         ham
//         pineapple
//     }
//     capricciosa: {
//         sauce
//         ham
//         mushroom
//         sausage
//         mozzarella
//         oregano
//         chili
//     }
//     contadina: {
//         potato
//         sausage
//         mozzarella
//         rosemary
//         oregano
//         garlic
//     }
//     calabrese: {
//         sauce
//         onion
//         salami
//         capsicum
//         anchovy
//         olive
//         mozzarella
//         oregano
//     }
//     funghi: {
//         sauce
//         mushroom
//         mozzarella
//         oregano
//         parmesan
//         garlic
//     }
//     gamberi: {
//         sauce
//         prawn
//         mozzarella
//         oregano
//         parmesan
//         chili
//         garlic
//     }
// }
