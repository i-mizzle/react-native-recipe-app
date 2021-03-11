import { MEALS } from '../../data/dummy-data'
import { TOGGLE_FAVOURITE, SET_FILTERS } from '../actions/meals';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favouriteMeals: []
}

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVOURITE:
            // check if item is already un favourites
            const existingIndex = state.favouriteMeals.findIndex(meal => meal.id === action.mealId)
            if (existingIndex >= 0){
                const updatedFavMeals = [ ...state.favouriteMeals ];
                updatedFavMeals.splice(existingIndex, 1);
                return { ...state, favouriteMeals: updatedFavMeals }
            } else {
                const meal = state.meals.find(meal => meal.id === action.mealId)
                return { ...state, favouriteMeals: state.favouriteMeals.concat(meal) }
            }
        case SET_FILTERS:
            const appliedFilters = action.filters;
            const updatedFilteredMeals = state.meals.filter(meal => {
                if (appliedFilters.glutenFree && !meal.isGlutenFree) {
                    false
                }
                if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
                    false
                }
                if (appliedFilters.vegetarian && !meal.isVegetarian) {
                    false
                }
                if (appliedFilters.vegan && !meal.isVegan) {
                    false
                }
                return true
            });
            return { ...state, filteredMeals: updatedFilteredMeals }

        default:
            return state;
    }
}


export default mealsReducer;