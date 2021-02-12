/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Dimensions} from 'react-native';
import {PickerIOS, Picker} from '@react-native-community/picker';
import {Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

export const PickerScreen = (props) => {
  return (
    <View
      style={{
        backgroundColor: '#f1f0f6',
      }}>
      {props.genrearr && props.genrearr.length > 0 ? (
        <>
          {Platform.OS === 'ios' ? (
            <PickerIOS
              onStartShouldSetResponder={false}
              style={{color: '#000'}}
              itemStyle={{color: '#000'}}
              selectedValue={props.genre_id ? props.genre_id : ''}
              onValueChange={(itemValue, itemIndex) => {
                props.setgenreid(itemValue);
                props.showpicker(false);
              }}>
              <PickerIOS.Item label="Select Genre" />
              {props.genrearr &&
                props.genrearr.length > 0 &&
                props.genrearr.map((value) => {
                  return (
                    <PickerIOS.Item
                      key={`country_${Date.now()}${value.id}`}
                      value={value}
                      label={value.genre}
                    />
                  );
                })}
            </PickerIOS>
          ) : (
            <Picker
              onStartShouldSetResponder={false}
              style={{color: '#000'}}
              itemStyle={{color: '#000'}}
              selectedValue={props.genre_id ? props.genre_id : ''}
              onValueChange={(itemValue, itemIndex) => {
                props.setgenreid(itemValue);
                props.showpicker(false);
              }}>
              <Picker.Item label="Select Genre" />
              {props.genrearr &&
                props.genrearr.length > 0 &&
                props.genrearr.map((value) => {
                  return (
                    <Picker.Item
                      key={`country_${Date.now()}${value.id}`}
                      value={value.id}
                      label={value.genre}
                    />
                  );
                })}
            </Picker>
          )}
        </>
      ) : null}
    </View>
  );
};
