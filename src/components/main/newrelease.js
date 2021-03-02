import React from 'react';
import {FlatList, View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import MUSICLOGO from '../../assets/images/musiclogo.png';
import {connect} from 'react-redux';
import {currentplaylist} from '../../globals/store/actions/player';
import {showmodal} from '../modal';
import api from '../../config/api';
import {PushScreen} from '../../navigation/pushscreen';
import {PLAYLIST_SEARCH_SCREEN} from '../../navigation/screen';
import {useTranslation} from 'react-i18next';

const NewRelease = (props) => {
  const {t, i18n} = useTranslation();
  const openplayer = async (item,imagetop) => {
    item.state = true;
    item.topimage = imagetop;

    const results = await props.currentplaylist({
      item: {
        cover_image: null,
        id: null,
        playlist: "New Release",
        song: item
      },
      list: item,
      currentsong: props.Player.currentsong,
    });
    if (results.success) {
      PushScreen(PLAYLIST_SEARCH_SCREEN, props, true, {...item});
      // showmodal(item);
    }
  };
  const renderItem = ({item}) => (
    <>
      {!item.hide ? (
        <TouchableOpacity
          key={`index_3_topsingle_${String(item.id)}`}
          style={styles.spacing}
          onPress={() => {
            openplayer(item.data, item.title);
          }}>
          <FastImage
            style={styles.imagestyle}
            source={
              item.song_image
                ? item.song_image
                : MUSICLOGO
            }
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text adjustsFontSizeToFit={true} style={styles.titlestyle}>
            {t(item.title)}
          </Text>
          <Text style={styles.artiststyle}>{t(item.secondtitle)}</Text>
        </TouchableOpacity>
      ) : null}
    </>
  );
  return (
    <View>
      {props.Player && props.Player.topsongs && (
        props.Player.topsongs.new_release && props.Player.topsongs.new_release.length > 0 || 
        props.Player.topsongs.top_hits && props.Player.topsongs.top_hits.length > 0 || 
        props.Player.topsongs.top_singles && props.Player.topsongs.top_singles.length > 0
        ) ? (
        <View style={styles.liststyle}>
          <View style={styles.spacingtop}>
            <Text style={styles.fontstyle}>{t('Discover')}</Text>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listcontainerstyle}
            data={[
              {
              title: "Top_Singles",
              secondtitle: "This_Year",
              song_image:require('../../assets/images/topsingle.png'),
              data: props?.Player?.topsongs?.top_singles ? props?.Player?.topsongs?.top_singles : []
              },
              {
              title: "Top_Hits",
              secondtitle: "Today",
              song_image:require('../../assets/images/tophits.png'),
              data: props?.Player?.topsongs?.top_hits ? props?.Player?.topsongs?.top_hits : []
              },
              {
              title: "New_Release",
              secondtitle: "",
              song_image:require('../../assets/images/newrelease.png'),
              data: props?.Player?.topsongs?.new_release ? props?.Player?.topsongs?.new_release : []
              }
          ]}
            renderItem={(item) => renderItem(item)}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : null}
    </View>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth.currentuser,
  Playlist: state.Playlist,
  Player: state.Player,
});
const mapDispatchToProps = {currentplaylist};
export default connect(mapStateToProps, mapDispatchToProps)(NewRelease);

const styles = StyleSheet.create({
  fontstyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'left',
  },
  titlestyle: {
    color: '#fff',
    textAlign: 'left',
    fontWeight: '700',
    paddingTop: 5,
    paddingLeft: 3,
  },
  artiststyle: {
    color: '#fff',
    opacity: 0.4,
    textAlign: 'left',
    paddingTop: 5,
    paddingLeft: 3,
  },
  spacingtop: {
    margin: 10,
  },
  liststyle: {
    margin: 10,
  },
  imagestyle: {
    width: 112,
    height: 100,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  listcontainerstyle: {
    flexDirection: 'row',
  },
  spacing: {
    margin: 10,
    width: 112,
    height: 154,
    borderRadius: 3,
  },
});
