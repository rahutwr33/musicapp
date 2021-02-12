import React from 'react';
import {FlatList, View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import MUSICLOGO from '../../assets/images/musiclogo.png';
import {connect} from 'react-redux';
import {currentplaylist} from '../../globals/store/actions/player';
import api from '../../config/api';
import {PushScreen} from '../../navigation/pushscreen';
import {PLAYLIST_SEARCH_SCREEN} from '../../navigation/screen';
import {useTranslation} from 'react-i18next';

const MadeforYou = (props) => {
  const {t, i18n} = useTranslation();

  const openplayer = async (item) => {
    item.state = true;
    const results = await props.currentplaylist({
      item: item,
      list: props.madeforyou,
      currentsong: props.Player.currentsong,
    });
    if (results.success) {
      PushScreen(PLAYLIST_SEARCH_SCREEN, props, true, item);
      // showmodal(item);
    }
  };
  const renderItem = ({item}) => (
    <>
      {!item.hide ? (
        <TouchableOpacity
          key={`index_made_for_you${String(item.id)}_${Date.now()}`}
          style={styles.spacing}
          onPress={() => {
            openplayer(item);
          }}>
          <FastImage
            style={styles.imagestyle}
            source={
              item.song_image
                ? {
                    uri: `${api.imageurl}${item.song_image}`,
                    priority: FastImage.priority.normal,
                  }
                : MUSICLOGO
            }
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.titlestyle}>{item.song_title}</Text>
          <Text style={styles.artiststyle}>{item.artist_name}</Text>
        </TouchableOpacity>
      ) : null}
    </>
  );
  return (
    <View>
      {props.madeforyou && props.madeforyou.length > 0 ? (
        <View style={styles.liststyle}>
          <View style={styles.spacingtop}>
            <Text style={styles.fontstyle}>{t('Made_for_you')}</Text>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listcontainerstyle}
            data={props.madeforyou}
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
export default connect(mapStateToProps, mapDispatchToProps)(MadeforYou);

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
    backgroundColor: '#b4b4b4',
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
