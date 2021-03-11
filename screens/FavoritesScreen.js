import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import DefaultText from '../components/DefaultText'


import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data';
import HeaderButton from '../components/HeaderButton';

const FavoritesScreen = props => {
    const favMeals = useSelector(state => state.meals.favouriteMeals)

    if (!favMeals || favMeals.length === 0) {
        return <View style={styles.empty}>
            <DefaultText>No favourite meals added yet. Start adding some!</DefaultText>
        </View>
    }
    return <MealList listData={favMeals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'My Favourites',
        headerLeft: () =>  <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    empty:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FavoritesScreen;