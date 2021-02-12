/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Header, Left, Body, Right, Button, Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StatusBar} from 'react-native';
import {useTranslation} from 'react-i18next';

export const ProfileHeaders = (props) => {
  return (
    <Header
      iosBarStyle={'light-content'}
      androidStatusBarColor="#262626"
      style={{backgroundColor: '#262626', borderBottomColor: '#262626'}}>
      <StatusBar backgroundColor="#262626" barStyle="dark-content" />
      <Left>
        {props.lefticon ? (
          <Button transparent onPress={() => props.leftonPress()}>
            <Icon
              name={props.lefticon}
              size={20}
              style={{paddingLeft: 10, color: '#ffffff', fontWeight: '700'}}
            />
          </Button>
        ) : null}
      </Left>
      <Body style={{flex: 3}}>
        <Text style={{color: '#ffffff', fontSize: 16, fontWeight: '700'}}>
          {props.title}
        </Text>
      </Body>
      <Right>
        <Button transparent onPress={() => props.onPress()}>
          <Icon color="#ffffff" name={props.righticon} size={25} />
        </Button>
      </Right>
    </Header>
  );
};

const MainHeaders = (props) => {
  const {t, i18n} = useTranslation();
  return (
    <Header
      iosBarStyle={'light-content'}
      androidStatusBarColor="#262626"
      style={{backgroundColor: '#262626', borderBottomColor: '#262626'}}>
      <StatusBar backgroundColor="#262626" barStyle="dark-content" />
      <Left style={{flex: 0.3}}>
        {!props.leftttext ? (
          <Button transparent onPress={() => props.rightonPress()}>
            <Icon
              name={props.lefticon}
              size={20}
              style={{paddingLeft: 10, color: '#ffffff', fontWeight: '700'}}
            />
          </Button>
        ) : (
          <Button transparent onPress={() => props.lefttonPress()}>
            <Text style={{color: '#01BDBD', fontSize: 16}}>{t('Save')}</Text>
          </Button>
        )}
      </Left>
      <Body style={{flex: 0.5}}>
        <Text
          style={{
            color: '#ffffff',
            fontSize: 16,
            fontWeight: '700',
            alignSelf: 'center',
          }}>
          {props.title}
        </Text>
      </Body>
      <Right style={{flex: 0.2}}>
        <Button transparent onPress={() => props.onPress()}>
          <Icon color="#ffffff" name={props.righticon} size={25} />
        </Button>
      </Right>
    </Header>
  );
};

export const MainNavigationHeaders = (props) => {
  const {t, i18n} = useTranslation();
  return (
    <Header
      iosBarStyle={'light-content'}
      androidStatusBarColor="#262626"
      style={{backgroundColor: '#262626', borderBottomColor: '#262626'}}>
      <StatusBar backgroundColor="#262626" barStyle="dark-content" />
      <Left style={{flex: 0.3}} />
      <Body style={{flex: 0.5}}>
        <Text
          style={{
            color: '#ffffff',
            fontSize: 16,
            fontWeight: '700',
            alignSelf: 'center',
          }}>
          {props.title}
        </Text>
      </Body>
      <Right style={{flex: 0.2}}>
        <Button transparent onPress={() => props.onPress()}>
          <Icon color="#ffffff" name={props.righticon} size={25} />
        </Button>
      </Right>
    </Header>
  );
};

export default MainHeaders;
