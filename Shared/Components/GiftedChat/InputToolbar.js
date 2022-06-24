import React from 'react';
import { Icon } from '@rneui/themed';
import { InputToolbar, Composer, Send } from 'react-native-gifted-chat/src';

import colors from '../../Helpers/colors';

export const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: colors.secondary,
      borderRadius: 3,
      alignItems: 'stretch',
      justifyContent: 'center',
    }}
    primaryStyle={{
      alignItems: 'stretch',
      justifyContent: 'center',
    }}
  />
)

export const renderComposer = (props) => (
  <Composer
    {...props}
    textInputStyle={{
      color: colors.white,     
    }}
    placeholderTextColor={colors.white}
  />
);

export const renderSend = (props) => (
  <Send
    {...props}
    containerStyle={{
      backgroundColor: colors.secondary_light,
      paddingVertical: 8,
      paddingHorizontal: 15,
      justifyContent: 'center',
    }}
  >
    <Icon name="arrow-upward" size={26} color={colors.white} />
  </Send>
)