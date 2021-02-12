import * as React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';

export const BUTTON_HEIGHT = 48;
export const BUTTON_WIDTH = 200;
import {useTranslation} from 'react-i18next';

export const ShufflePlay = ({onshuffleplay}) => {
  const {t, i18n} = useTranslation();

  return (
    <TouchableWithoutFeedback onPress={() => onshuffleplay()}>
      <View style={styles.button}>
        <Text style={styles.label}>{t('Shuffle_Play')}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: '#01BDBD',
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    borderRadius: 32,
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});
