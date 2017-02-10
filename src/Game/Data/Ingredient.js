//@flow
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

let data:{[id:IngredientType]:IngredientDataType} = {
    MOZZARELLA: {label: "Mozzarella", cost:1}
}
export default data;

