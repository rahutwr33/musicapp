/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';

const tooltipDecorators = (state, data) => () => {
  if (state === null) {
    return null;
  }
  const {value, x, y} = state;
  return (
    <View
      style={{
        width: value > 999 ? 50 : value > 99 ? 50 : 50,
        height: value > 999 ? 20 : value > 99 ? 20 : 20,
        backgroundColor: '#fff',
        position: 'absolute',
        top: y - 36,
        left: x - 12,
        justifyContent: 'center',
        borderRadius: 5,
      }}>
      <Text
        adjustsFontSizeToFit={true}
        style={{
          fontSize: 12,
          color: '#000',
          textAlign: 'center',
          fontWeight: '700',
        }}>
        {value}
      </Text>
    </View>
  );
};
export default tooltipDecorators;
