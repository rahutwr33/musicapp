/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Header, Left, Body, Right, Button, Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const PlayListSearchHeaders = (props) => {
  return (
    <Header
      iosBarStyle={'light-content'}
      androidStatusBarColor="#262626"
      style={{
        backgroundColor: '#262626',
        borderBottomColor: '#262626',
      }}>
      <Left style={{flexDirection: 'row'}}>
        {props.lefticon.map((key, i) => {
          if (key.lefticon) {
            return (
              <Button transparent onPress={() => props.onLeftPress(i)}>
                <Icon
                  name={key.lefticon}
                  size={20}
                  style={{paddingLeft: 10, color: '#ffffff', fontWeight: '700'}}
                />
              </Button>
            );
          } else {
            return (
              <Button transparent onPress={() => props.onLeftPress(i)}>
                <Text style={{color: '#01BDBD', fontSize: 16}}>{key.text}</Text>
              </Button>
            );
          }
        })}
      </Left>
      <Body style={{flex: 3}}>
        <Text style={{color: '#ffffff', fontSize: 16, fontWeight: '700'}}>
          {props.title}
        </Text>
      </Body>
      <Right>
        <Button transparent onPress={() => props.onRightPress()}>
          <Icon color="#ffffff" name={props.righticon} size={25} />
        </Button>
      </Right>
    </Header>
  );
};

export default PlayListSearchHeaders;
