import React from 'react';
import {FlatList,ImageBackground, View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import MUSICLOGO from '../../assets/images/musiclogo.png';
import {connect} from 'react-redux';
import {currentplaylist} from '../../globals/store/actions/player';
import {showmodal} from '../modal';
import api from '../../config/api';
import {PushScreen} from '../../navigation/pushscreen';
import {PLAYLIST_SEARCH_SCREEN} from '../../navigation/screen';
import {useTranslation} from 'react-i18next';

const YourMix = (props) => {
  const {t, i18n} = useTranslation();
  const openplayer = async (item, imagetop) => {
    item.state = true;
    item.topimage = imagetop;
    const results = await props.currentplaylist({
      item: {
        cover_image: null,
        id: null,
        playlist: "Your Mix",
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
  const renderItem = ({item}) => {
    return(    
      <>
          <TouchableOpacity
            key={`index_3_heavy_${String(item.id)}`}
            style={[styles.spacing,]}
            onPress={() => {
              openplayer(item.data,item.slug);
            }}>
            <ImageBackground
              style={styles.imagestyle}
              source={item.image}
            >
              <ImageBackground
              style={styles.backimagestyle}
              source={item.backimage}
            >
            <Text adjustsFontSizeToFit={true} style={styles.titlestyle}>
              {t(item.title)}
            </Text>
            </ImageBackground>
            </ImageBackground>
          </TouchableOpacity>
      </>
    )
  };
  return (
    <View>
      {props.Player && props.Player.topsongs && (
        props.Player.topsongs.new_release && props.Player.topsongs.new_release.length > 0 || 
        props.Player.topsongs.top_hits && props.Player.topsongs.top_hits.length > 0 || 
        props.Player.topsongs.top_singles && props.Player.topsongs.top_singles.length > 0
        ) ? (
        <View style={styles.liststyle}>
          <View style={styles.spacingtop}>
            <Text style={styles.fontstyle}>{t('Daily_Mix')}</Text>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listcontainerstyle}
            data={[
              {
              title: "Your_Mix",
              slug: "mix3",
              secondtitle: "",
              image: require('../../assets/images/Group.png'),
              backimage: require('../../assets/images/mix3.png'),
              data: props?.Player?.topsongs?.your_mix?.mix1 ? props?.Player?.topsongs?.your_mix?.mix1 : []
              },
              {
              title: "Your_Mix",
              secondtitle: "",
              slug: "mix2",
              image: require('../../assets/images/Rectangle.png'),
              backimage: require('../../assets/images/mix2.png'),
              data: props?.Player?.topsongs?.your_mix?.mix2 ? props?.Player?.topsongs?.your_mix?.mix2 : []
              },
              {
              title: "Your_Mix",
              secondtitle: "",
              slug: "mix1",
              image: require('../../assets/images/Rectangletwo.png'),
              backimage: require('../../assets/images/mix1.png'),
              data: props?.Player?.topsongs?.your_mix?.mix3 ? props?.Player?.topsongs?.your_mix?.mix3 : []
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
export default connect(mapStateToProps, mapDispatchToProps)(YourMix);

const styles = StyleSheet.create({
  fontstyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'left',
  },
  titlestyle: {
    color: '#000',
    fontWeight: '800',
    textAlign:'center',
    marginTop: 25,
    left:10
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
  },
  backimagestyle: {
    width: 112,
    height: 40,
    marginTop: 72
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
