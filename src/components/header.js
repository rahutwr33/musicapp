/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Header, Left, Body, Right, Button, Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {PopScreen} from '../navigation/pushscreen';
import {StatusBar} from 'react-native';

const Headers = (props) => {
  return (
    <Header
      iosBarStyle={'light-content'}
      androidStatusBarColor="#262626"
      style={{backgroundColor: '#262626', borderBottomColor: '#262626'}}>
      <StatusBar backgroundColor="#262626" barStyle="dark-content" />

      <Left />
      <Body style={{flex: 3}}>
        <Text style={{color: '#ffffff', fontSize: 16, fontWeight: '700'}}>
          {props.title}
        </Text>
      </Body>
      <Right>
        <Button
          transparent
          onPress={() =>
            PopScreen(
              props.navigation,
              props && props.visible ? props.visible : false,
            )
          }>
          <Icon color="#ffffff" name="long-arrow-right" size={25} />
        </Button>
      </Right>
    </Header>
  );
};

export const HeaderWithoutNavigation = (props) => {
  return (
    <Header
      iosBarStyle={'light-content'}
      androidStatusBarColor="#262626"
      style={{backgroundColor: '#262626', borderBottomColor: '#262626'}}>
      <Left />
      <Body style={{flex: 3}}>
        <Text style={{color: '#ffffff', fontSize: 16, fontWeight: '700'}}>
          {props.title}
        </Text>
      </Body>
      <Right />
    </Header>
  );
};

export default Headers;
