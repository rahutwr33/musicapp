/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import Player from '../../components/miniplayer';
import {connect} from 'react-redux';
import {statusbarheight} from '../../utils/statusbarheight';
import {Content} from 'native-base';
import {currentplaylist} from '../../globals/store/actions/player';
import PlayListSection from '../../components/playlistsection';
import GlobalSearchBarScreen from '../../components/globalsearchbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {PopScreen} from '../../navigation/pushscreen';
import {StatusBar} from 'react-native';
import {useTranslation} from 'react-i18next';

const LibraryPlaylist = (props) => {
  const [tabindex, settabIndex] = useState(2);
  const [state, setstate] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [backbtn, setbackbtn] = useState(false);
  const {t, i18n} = useTranslation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    if (props.state === 0) {
      settabIndex(0);
    }
  }, [state]);
  useEffect(() => {
    if (props && props.state > -1) {
      setbackbtn(true);
    }
  }, [props]);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#262626" barStyle="dark-content" />
      {!state ? (
        <View style={styles.headerstyle}>
          <TouchableOpacity style={styles.space} onPress={() => settabIndex(0)}>
            <Text
              adjustsFontSizeToFit={true}
              style={[
                styles.tabfontcolor,
                {color: tabindex === 0 ? '#01BDBD' : '#fff'},
              ]}>
              {t('Albums')}
            </Text>
            {tabindex === 0 ? <View style={styles.underline} /> : null}
          </TouchableOpacity>
          <TouchableOpacity style={styles.space} onPress={() => settabIndex(1)}>
            <Text
              adjustsFontSizeToFit={true}
              style={[
                styles.tabfontcolor,
                {color: tabindex === 1 ? '#01BDBD' : '#fff'},
              ]}>
              {t('Songs')}
            </Text>
            {tabindex === 1 ? <View style={styles.underline} /> : null}
          </TouchableOpacity>
          <TouchableOpacity style={styles.space} onPress={() => settabIndex(2)}>
            <Text
              adjustsFontSizeToFit={true}
              style={[
                styles.tabfontcolor,
                {color: tabindex === 2 ? '#01BDBD' : '#fff'},
              ]}>
              {t('Playlist')}
            </Text>
            {tabindex === 2 ? <View style={styles.underline} /> : null}
          </TouchableOpacity>
          {backbtn ? (
            <Icon
              onPress={() => PopScreen(props)}
              color="#ffffff"
              name="long-arrow-right"
              size={25}
              style={{
                margin: 10,
                justifyContent: 'flex-end',
                position: 'absolute',
                right: 0,
                width: '10%',
              }}
            />
          ) : null}
        </View>
      ) : null}
      <Content>
        {!state ? (
          <PlayListSection
            tabindex={tabindex}
            {...props}
            activesearchbar={(e) => setstate(e)}
          />
        ) : null}
        {state ? (
          <Animated.View style={[{opacity: fadeAnim}]}>
            <GlobalSearchBarScreen
              {...props}
              type={tabindex}
              tabindex={tabindex}
              activesearchbar={(e) => setstate(e)}
            />
          </Animated.View>
        ) : null}
      </Content>
      <Player />
    </View>
  );
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
  Playlist: state.Playlist || [],
  Player: state.Player || [],
});

const mapDispatchToProps = {currentplaylist};
export default connect(mapStateToProps, mapDispatchToProps)(LibraryPlaylist);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
    marginTop: statusbarheight,
  },
  headerstyle: {
    flexDirection: 'row',
    width: null,
    height: 50,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-start',
    marginTop: 20,
    marginRight: 20,
    flex: 0.07,
  },
  tabfontcolor: {
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabStyle: {backgroundColor: '#262626'},
  tabContainerStyle: {
    backgroundColor: '#262626',
  },
  underline: {
    backgroundColor: '#01BDBD',
    width: null,
    height: 2,
    marginTop: 5,
  },
  space: {
    marginHorizontal: 5,
    padding: 10,
  },
  contentstyle: {
    flex: 0.9,
    marginTop: 10,
  },
});
