/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {UserList, ArtistList} from '../utils/data/sidebar';
import {useTranslation} from 'react-i18next';

const SidebarList = ({user, onpress, cleanState, logout, lang}) => {
  const {t, i18n} = useTranslation();
  let data = [];
  if (user && user.is_artist) {
    data = ArtistList;
  } else if (user && user.is_listener) {
    data = UserList;
  }
  const renderItem = ({item}) => (
    <TouchableOpacity
      key={`index_89${String(item.id)}_${Date.now()}`}
      style={styles.liststyle}
      onPress={() => onpress(item)}>
      <View style={styles.space}>
        {item.text === 'Upload' ? (
          <FontAwesomeIcon name="cloud" size={20} color="#8b8b8b" />
        ) : (
          <Icon name={item.icon} size={20} color="#8b8b8b" />
        )}
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={styles.fontStyle}>
          {t(`${item.lang}`)}
        </Text>
        <Text style={{color: '#fff', marginLeft: 5, paddingTop: 1}}>
          {item.text === 'Language'
            ? i18n.language === 'en'
              ? '(English)'
              : '(עִברִית)'
            : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const footerItem = () => {
    return (
      <TouchableOpacity
        onPress={() => logout()}
        style={{
          flexDirection: 'row',
          paddingLeft: 15,
          marginTop: 25,
        }}>
        <Icon name="logout" size={20} color="#fff" />
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={[styles.fontStyle2]}>
          {t('Logout')}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <FlatList
        data={data}
        renderItem={(item) => renderItem(item)}
        ListFooterComponent={() => footerItem()}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

const styles = StyleSheet.create({
  liststyle: {
    margin: 5,
  },
  fontStyle: {
    color: '#8b8b8b',
    fontSize: 16,
    fontWeight: '700',
    paddingLeft: 20,
  },
  fontStyle2: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    paddingLeft: 20,
  },
  space: {
    margin: 10,
    flexDirection: 'row',
  },
});

export default SidebarList;
