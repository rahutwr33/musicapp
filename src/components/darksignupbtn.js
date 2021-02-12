import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

export const DarkSignupButton = (props) => {
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={props.onPress}>
      <Text style={styles.fontStyle}>{props.buttonTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 20,
    alignSelf: 'center',
    borderColor: '#01BDBD',
    backgroundColor: '#262626',
    borderRadius: 25,
    borderWidth: 1,
  },
  fontStyle: {
    color: '#01BDBD',
    fontSize: 14,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    fontWeight: '700',
  },
});
