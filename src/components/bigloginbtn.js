/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

export const BigLoginButton = (props) => {
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={props.onPress}>
      <Text style={styles.fontStyle}>{props.buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export const Facebookbutton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.fbbuttonStyle, {backgroundColor: '#3B5998'}]}
      onPress={props.onPress}>
      <Text
        style={[
          styles.fontStyle,
          {
            paddingLeft: 15,
            paddingRight: 15,
            fontSize: 10,
            paddingTop: 10,
            paddingBottom: 10,
          },
        ]}>
        {props.buttonTitle}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#01BDBD',
    borderRadius: 25,
  },
  fbbuttonStyle: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#01BDBD',
    borderRadius: 25,
  },
  fontStyle: {
    color: '#ffffff',
    fontSize: 16,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    fontWeight: '700',
  },
});
