import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

export const Button = (props) => {
  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={props.onPress}
      {...props}>
      <Text style={styles.fontStyle}>{props.buttonTitle}</Text>
    </TouchableOpacity>
  );
};
export const SmallButton = (props) => {
  return (
    <TouchableOpacity style={styles.buttonStyle2} onPress={props.onPress}>
      <Text style={styles.fontStyle2}>{props.buttonTitle}</Text>
    </TouchableOpacity>
  );
};
export const LargeButton = (props) => {
  return (
    <TouchableOpacity style={styles.buttonStyle3} onPress={props.onPress}>
      <Text style={styles.fontStyle3}>{props.buttonTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: '5%',
    alignSelf: 'center',
    backgroundColor: '#01BDBD',
    borderRadius: 25,
    paddingLeft: 25,
    paddingRight: 25,
    padding: 5,
  },
  buttonStyle2: {
    marginTop: '5%',
    alignSelf: 'center',
    backgroundColor: '#01BDBD',
    borderRadius: 25,
  },
  buttonStyle3: {
    marginTop: '5%',
    alignSelf: 'center',
    backgroundColor: '#01BDBD',
    borderRadius: 25,
    paddingLeft: 10,
    paddingRight: 10,
    padding: 10,
  },
  fontStyle: {
    color: '#ffffff',
    fontSize: 12,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  fontStyle2: {
    color: '#ffffff',
    fontSize: 12,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  fontStyle3: {
    color: '#ffffff',
    fontSize: 16,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
});
