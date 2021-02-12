import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import MainHeaders from './mainheader';
import {statusbarheight} from '../utils/statusbarheight';
import NoImage from '../assets/images/noimage.png';
import {songsList, submitqueuesong} from '../globals/store/actions/song';
import api from '../config/api';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Button} from './button';
import {Content} from 'native-base';
import {PopScreen} from '../navigation/pushscreen';
import {useTranslation} from 'react-i18next';

const AddSongToAlbum = (props) => {
  const [song, setstate] = useState([]);
  const [loader, setloader] = useState(false);
  const [id, setID] = useState([]);
  const {t, i18n} = useTranslation();

  const getSongs = async () => {
    const result = await songsList();
    if (result && result.success) {
      setloader(false);
      setstate(result.data);
    }
  };
  useEffect(() => {
    setloader(true);
    getSongs();
  }, []);
  useEffect(() => {
    if (
      props &&
      props.Song &&
      props.Song.queuealbum &&
      Array.isArray(props.Song.queuealbum)
    ) {
      setID(props.Song.queuealbum);
    }
  }, [props]);

  const addsongtoqueue = (item) => {
    console.log(item.id);
    let findindex = id.findIndex((x) => x.id === item.id);
    if (findindex > -1) {
      id.splice(findindex, 1);
      setID([...id]);
    } else {
      id.push(item);
      setID([...id]);
    }
  };
  const closeModal = () => {
    PopScreen(props, true);
  };
  const submit = async () => {
    const submitsong = await props.submitqueuesong(id);
    if (submitsong) {
      PopScreen(props, true);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      key={`playlist${String(item.id)}${Date.now()}`}
      onPress={() => addsongtoqueue(item)}
      style={styles.liststyle}>
      <View
        style={{...{justifyContent: 'space-between', flexDirection: 'row'}}}>
        <View
          style={{
            ...{
              flexDirection: 'row',
              flex: 0.9,
              alignItems: 'center',
            },
          }}>
          <Image
            source={
              item.song_image ? {uri: api.imageurl + item.song_image} : NoImage
            }
            style={styles.imagestyle}
          />
          <View style={{...{paddingLeft: 15}}}>
            <Text
              adjustsFontSizeToFit={true}
              style={{...styles.rightstyle, ...styles.topspace}}>
              {item.song_title}
            </Text>
            <View style={{...{}}}>
              <Text
                adjustsFontSizeToFit={true}
                style={{
                  ...styles.rightstyle,
                  ...{fontSize: 12, opacity: 0.5, paddingTop: 3},
                }}>
                {`${item.artist_name}`}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            ...{flex: 0.1, alignItems: 'center', justifyContent: 'center'},
          }}>
          {id.findIndex((x) => x.id === item.id) > -1 ? (
            <Icon name="check-circle" size={16} color="#fff" />
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <MainHeaders
        title={t('Add_song_in_album')}
        navigation={props.navigation}
        onPress={() => closeModal()}
        righticon="long-arrow-right"
        leftonPress={() => {}}
      />
      <Content>
        <View style={styles.center}>
          <Text style={styles.fontstyle}>{t('Songs_List')}</Text>
        </View>
        <View style={{...styles.topspace}}>
          {loader ? <ActivityIndicator size="large" /> : null}
          <FlatList
            data={song}
            renderItem={(item) => renderItem(item)}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
        {song.length > 0 ? (
          <Button buttonTitle={t('DONE')} onPress={() => submit()} />
        ) : null}
      </Content>
    </View>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth.currentuser,
  Playlist: state.Playlist,
  Song: state.Song,
});

const mapDispatchToProps = {submitqueuesong};
export default connect(mapStateToProps, mapDispatchToProps)(AddSongToAlbum);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: statusbarheight,
    marginBottom: 10,
  },
  center: {
    alignSelf: 'center',
  },
  topspace: {
    marginTop: 20,
  },
  liststyle: {
    marginTop: 10,
    marginLeft: 10,
  },
  imagestyle: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  rightstyle: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
  },
  fontstyle: {
    color: '#fff',
    fontSize: 16,
  },
});
