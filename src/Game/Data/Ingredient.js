// @flow

import DataMap from 'Game/Data/Map'


export type IngredientType = 
    'MOZZARELLA' |
    'SAUCE' |
    'BBQ' |
    'TOMATO' |
    'OREGANO' |
    'ROSEMARY' |
    'BASIL' |
    'GARLIC' |
    'CHILI' |
    'SALAMI' |
    'ANCHOVY' |
    'CAPSICUM' |
    'OLIVE' |
    'HAM' |
    'MUSHROOM' |
    'SAUSAGE' |
    'POTATO' |
    'PARMESAN' |
    'OLIVEOIL' |
    'BACON' |
    'CABANOSSI' |
    'SEAFOOD' |
    'PRAWN' |
    'CHICKEN' |
    'SPINACH' |
    'ROCKET' |
    'PINEAPPLE' |
    'ONION'

export type IngredientDataType = {
    label:string,
    cost:number
}


export const Ingredient:{[id:IngredientType]:IngredientType} = {
    'MOZZARELLA': 'MOZZARELLA',
    'SAUCE': 'SAUCE',
    'BBQ': 'BBQ',
    'TOMATO': 'TOMATO',
    'OREGANO': 'OREGANO',
    'ROSEMARY': 'ROSEMARY',
    'BASIL': 'BASIL',
    'GARLIC': 'GARLIC',
    'CHILI': 'CHILI',
    'SALAMI': 'SALAMI',
    'ANCHOVY': 'ANCHOVY',
    'CAPSICUM': 'CAPSICUM',
    'OLIVE': 'OLIVE',
    'HAM': 'HAM',
    'MUSHROOM': 'MUSHROOM',
    'SAUSAGE': 'SAUSAGE',
    'POTATO': 'POTATO',
    'PARMESAN': 'PARMESAN',
    'OLIVEOIL': 'OLIVEOIL',
    'BACON': 'BACON',
    'CABANOSSI': 'CABANOSSI',
    'SEAFOOD': 'SEAFOOD',
    'PRAWN': 'PRAWN',
    'CHICKEN': 'CHICKEN',
    'SPINACH': 'SPINACH',
    'ROCKET': 'ROCKET',
    'PINEAPPLE': 'PINEAPPLE',
    'ONION': 'ONION',
}
const ingredientData:DataMap<IngredientType, IngredientDataType> = new DataMap();
export default ingredientData;

ingredientData.put('MOZZARELLA', {label:'Mozzarella', cost:1})

// <<<<<<< HEAD
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
//     marinara: {
//         sauce
//         oregano
//         garlic
//         olive oil

//     }
//     meatlover:{
//         sauce
//         ham
//         salami
//         bacon
//         cabanossi
//         sausage
//         mozzarella
//         oregano

//     }
//     napoli:{
//         sauce
//         olive
//         anchovy
//         mozzarella
//         oregano

//     }
//     pescatore:{
//         sauce
//         seafood
//         oregano
//         chili
//         garlic
//     }

// =======
// let data:{[id:IngredientType]:IngredientDataType} = {
//     MOZZARELLA: {label: "Mozzarella", cost:1}
// >>>>>>> ac2cd21f7d738edc0f2342f89e41f3806bb48a3d
// }
// export default data;

