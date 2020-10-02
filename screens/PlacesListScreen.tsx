import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';

const PlacesListScreen = (props: any) => {
  return (
    <View>
      <Text>PlacesListScreen</Text>
    </View>
  );
};

PlacesListScreen.navigationOptions = (navData: any) => {
  return {
    headerTitle: 'All Places',
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='Add Place'
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={() => {
              navData.navigation.navigate('NewPlace');
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
