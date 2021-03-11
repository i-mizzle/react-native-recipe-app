import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import HeaderButton from '../components/HeaderButton';

const CategoriesScreen = props => {
    const renderGrifdItem = (itemData) => {
        return <CategoryGridTile 
            title={itemData.item.title} 
            color={itemData.item.color} 
            onSelect={() => {props.navigation.navigate(
                {
                    routeName: 'CategoryMeals', 
                    params: {
                        categoryId: itemData.item.id
                    }
                });
            }}
        />
    };

    return (
        <FlatList 
            keyExtractor={(item, index) => item.id}
            numColumns={2} 
            data = {CATEGORIES} 
            renderItem={renderGrifdItem} 
        />
        // <View style={styles.screen}>
        //     <Text>The categories screen</Text>
        //     <Button title="go to meals" onPress={()=> {
        //         // use replace when u dont want user to go back
        //         // props.navigation.replace('CategoryMeals')
        //         props.navigation.navigate({routeName: 'CategoryMeals'})

        //     }} />
        // </View>
    );
};

CategoriesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Meal Categories',
        headerLeft: () =>  <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
})

export default CategoriesScreen;