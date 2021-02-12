import React from 'react';
import {Switch} from 'react-native';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
export const ControlledSwitch = (props) => {
  return (
    <NativeViewGestureHandler
      hitSlop={20}
      shouldCancelWhenOutside={false}
      shouldActivateOnStart
      disallowInterruption>
      <Switch
        {...props}
        value={props.value}
        trackColor={{false: '#f9f9f9', true: '#01BDBD'}}
        ios_backgroundColor="#fff"
        onValueChange={(e) => props._onValueChange(e)}
      />
    </NativeViewGestureHandler>
  );
};
