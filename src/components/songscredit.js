/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');
import {useTranslation} from 'react-i18next';

export const SongsCreditScreen = (props) => {
  const {t, i18n} = useTranslation();

  return (
    <>
      {props.performedbyArr.map((key, index) => {
        return (
          <View style={styles.space} key={index}>
            {index === 0 ? (
              <Text style={styles.textstyle}>{t('Performed_by')}</Text>
            ) : null}
            <View style={styles.rowalign}>
              {index === 0 ? (
                <Icon
                  onPress={() =>
                    props.onperformedpress(
                      props.performedbyArr.length,
                      props.performedbyArr,
                    )
                  }
                  style={{...styles.searchIcon, ...{}}}
                  name="plus-circle"
                  size={30}
                  color="#fff"
                />
              ) : (
                <Icon
                  onPress={() => props.removeinput(index, props.performedbyArr)}
                  style={{...styles.searchIcon, ...{}}}
                  name="close"
                  size={30}
                  color="#fff"
                />
              )}
              <TextInput
                key={index}
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="off"
                onChangeText={(e) =>
                  props.onChangeText(e, index, props.performedbyArr)
                }
                style={[styles.inputstyle, {marginLeft: index === 0 ? 5 : 5}]}
              />
            </View>
          </View>
        );
      })}
      {props.writtenbyArr.map((key, index) => {
        return (
          <View style={styles.space} key={index}>
            {index === 0 ? (
              <Text style={styles.textstyle}>{t('Written_by')}</Text>
            ) : null}
            <View style={styles.rowalign}>
              {index === 0 ? (
                <Icon
                  onPress={() =>
                    props.onwrittenbyArr(
                      props.writtenbyArr.length,
                      props.writtenbyArr,
                    )
                  }
                  style={{...styles.searchIcon, ...{}}}
                  name="plus-circle"
                  size={30}
                  color="#fff"
                />
              ) : (
                <Icon
                  onPress={() =>
                    props.removewritteninput(index, props.writtenbyArr)
                  }
                  style={{...styles.searchIcon, ...{}}}
                  name="close"
                  size={30}
                  color="#fff"
                />
              )}
              <TextInput
                key={index}
                autoCorrect={false}
                autoCompleteType="off"
                autoCapitalize="none"
                onChangeText={(e) =>
                  props.onChangewrittenText(e, index, props.writtenbyArr)
                }
                style={[styles.inputstyle, {marginLeft: index === 0 ? 5 : 5}]}
              />
            </View>
          </View>
        );
      })}
      {props.producedbyArr.map((key, index) => {
        return (
          <View style={styles.space} key={index}>
            {index === 0 ? (
              <Text style={styles.textstyle}>{t('Produced_by')}</Text>
            ) : null}
            <View style={styles.rowalign}>
              {index === 0 ? (
                <Icon
                  onPress={() =>
                    props.onproducedbyArr(
                      props.producedbyArr.length,
                      props.producedbyArr,
                    )
                  }
                  style={{...styles.searchIcon, ...{}}}
                  name="plus-circle"
                  size={30}
                  color="#fff"
                />
              ) : (
                <Icon
                  onPress={() =>
                    props.removeproducedbyArrinput(index, props.producedbyArr)
                  }
                  style={{...styles.searchIcon, ...{}}}
                  name="close"
                  size={30}
                  color="#fff"
                />
              )}
              <TextInput
                key={index}
                autoCorrect={false}
                autoCompleteType="off"
                autoCapitalize="none"
                onChangeText={(e) =>
                  props.onChangeproducedbyArrText(e, index, props.producedbyArr)
                }
                style={[styles.inputstyle, {marginLeft: index === 0 ? 5 : 5}]}
              />
            </View>
          </View>
        );
      })}
      {props.sourcesArr.map((key, index) => {
        return (
          <View style={styles.space} key={index}>
            {index === 0 ? (
              <Text style={styles.textstyle}>{t('Sources')}</Text>
            ) : null}
            <View style={styles.rowalign}>
              {index === 0 ? (
                <Icon
                  onPress={() =>
                    props.onsourcesArr(
                      props.sourcesArr.length,
                      props.sourcesArr,
                    )
                  }
                  style={{...styles.searchIcon, ...{}}}
                  name="plus-circle"
                  size={30}
                  color="#fff"
                />
              ) : (
                <Icon
                  onPress={() =>
                    props.removesourcesArrinput(index, props.sourcesArr)
                  }
                  style={{...styles.searchIcon, ...{}}}
                  name="close"
                  size={30}
                  color="#fff"
                />
              )}
              <TextInput
                key={index}
                autoCorrect={false}
                autoCompleteType="off"
                autoCapitalize="none"
                onChangeText={(e) =>
                  props.onChangesourcesArrText(e, index, props.sourcesArr)
                }
                style={[styles.inputstyle, {marginLeft: index === 0 ? 5 : 5}]}
              />
            </View>
          </View>
        );
      })}
    </>
  );
};
const styles = StyleSheet.create({
  space: {
    marginTop: 20,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  rowalign: {
    flexDirection: 'row',
    marginTop: 10,
  },
  textstyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    padding: 5,
    textAlign: 'left',
  },
  inputstyle: {
    borderColor: '#fff',
    borderWidth: 1,
    padding: 10,
    width: width - 70,
    borderRadius: 5,
    color: '#fff',
    textAlign: 'left',
    marginLeft: 5,
  },
  searchIcon: {
    marginLeft: 5,
    paddingTop: 5,
  },
});
