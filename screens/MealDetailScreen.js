import React, { useEffect, useCallback } from 'react';
import { ScrollView, StyleSheet, Image, View, Text} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton'
import DefaultText from '../components/DefaultText'
import { toggleFavourite } from '../store/actions/meals';

const ListItem = props => {
    return <View style={styles.listItem}>
        <DefaultText>{props.children}</DefaultText>
    </View>
}

const MealDetailScreen = props => {
    const mealId = props.navigation.getParam('mealId')
    const availableMeals = useSelector(state => state.meals.meals)
    const currentMealIsFavourite = useSelector(state => state.meals.favouriteMeals.some(meal => meal.id === mealId))
    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    /** Sub-optimal solution for passing header title
     * it creates a delay in loading the title since the page has to render before the title is passed in
     * BETTER SOLUTION - Forward the meal title as well as the meal name from the previous screen (MealList.js))
     */
    // useEffect( () => {
    //     props.navigation.setParams({mealTitle: selectedMeal.title})
    // }, [selectedMeal])

    const dispatch = useDispatch()

    const toggleFavouriteHandler = useCallback(() => {
        dispatch(toggleFavourite(mealId))
    }, [dispatch, mealId]);

    useEffect( () => {
        props.navigation.setParams({toggleFav: toggleFavouriteHandler})
    }, [toggleFavouriteHandler])

    useEffect( () => {
        props.navigation.setParams({isFav: currentMealIsFavourite})
    }, [currentMealIsFavourite])

    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient => 
                <ListItem key={ingredient}>{ingredient}</ListItem>
            )}

            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step => 
                <ListItem key={step}>{step}</ListItem>
            )}
        </ScrollView>
    );
};

MealDetailScreen.navigationOptions = (navigationData) => {
    // const mealId = navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle')
    const toggleFavourite = navigationData.navigation.getParam('toggleFav')
    const isFavourite = navigationData.navigation.getParam('isFav')
    // const selectedMeal = MEALS.find(meal => meal.id === mealId);
    return {
        headerTitle: mealTitle,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title='Favourite' 
                iconName={ isFavourite ? 'ios-star' : 'ios-star-outline'} 
                onPress={toggleFavourite} 
            />
        </HeaderButtons>
    };
};
const styles = StyleSheet.create({
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    image: {
        width: '100%',
        height: 200
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
})

export default MealDetailScreen;