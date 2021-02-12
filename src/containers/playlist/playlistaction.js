/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  PermissionsAndroid,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  // SHARE_SCREEN,
  ARTIST_DETAIL_SCREEN,
  ADD_SONG_PLAYLIST,
  SONGS_CREDIT_SCREEN,
} from '../../navigation/screen';
import {
  // PushScreen,
  PopScreen,
  PushPropsScreen,
} from '../../navigation/pushscreen';
import NoImage from '../../assets/images/noimage.png';
import Heart from '../../assets/svg/heart.svg';
import BlueHeart from '../../assets/svg/blueheart.svg';
import {
  likesong,
  hidesong,
  reportsonexplicit,
  updatedownloadhistory,
  recentplayed,
  getuserselectionsong,
  heavyrotation,
  hiddenArtist,
} from '../../globals/store/actions/song';
import {Alerts} from '../../utils/alert';
import apiurl from '../../config/api';
import {connect} from 'react-redux';
import {
  updatecurrentsong,
  songstate,
  prevsong,
  nextsong,
  currentsong,
  currentplaylist,
} from '../../globals/store/actions/player';
import RNFetchBlob from 'rn-fetch-blob';
import storage from '../../utils/storage';
import Share from 'react-native-share';
import TrackPlayer from 'react-native-track-player';
import {Toast} from 'native-base';
import {
  userlikedsong,
  getplaylist,
  userAllsong,
  userAlbum,
} from '../../globals/store/actions/playlist';
import {useTranslation} from 'react-i18next';
const height = Dimensions.get('window').height;
const actions = [
  {
    title: 'Like',
    icon: 'heart',
  },
  {
    title: 'Hide_this_Song',
    icon: 'eye-slash',
  },
  {
    title: 'Add_to_playlist',
    icon: 'plus-circle',
  },
  {
    title: 'Share',
    icon: 'share',
  },
  {
    title: 'View_Artist',
    icon: 'eye',
  },
  {
    title: 'Play_back',
    icon: 'redo',
  },
  {
    title: 'Download_this_Song',
    icon: 'folder-download',
  },
  {
    title: 'Song_Credits',
    icon: 'user-friends',
  },
  {
    title: 'Block_Artist',
    icon: 'user-friends',
  },
  {
    title: 'Report_Explicit_Content',
    icon: 'flag',
  },
];

const PlaylistAction = (props) => {
  const [like, setLike] = useState(false);
  const [currentindex, setIndex] = useState();
  const [songtitle, settitle] = useState('');
  const [songartist, setartist] = useState('');
  const [loader, setloader] = useState(false);
  const [musicurl, setmusicurl] = useState('');
  const [songid, setsongid] = useState('');
  const [artistid, setartistid] = useState('');
  const {t, i18n} = useTranslation();

  useEffect(() => {
    if (props.state && props.state.detail) {
      setsongid(props.state.song_id);
      settitle(props.state.song_title);
      setartist(props.state.artist_name);
      setartistid(props.state.artist_id);
      setLike(props.state.like || false);
      setmusicurl(apiurl.imageurl + props.state.song_mp3);
    }
  }, []);
  const showactions = async (item) => {
    switch (item) {
      case 'Like':
        const likeresults = await likesong({
          song_id: songid,
        });
        if (likeresults && likeresults.success) {
          setLike(likeresults.data.like);
          Toast.show({
            text: likeresults.message,
            buttonText: 'Ok',
            duration: 3000,
            type: 'success',
          });
          await props.updatecurrentsong({like: likeresults.data.like});
          await props.userlikedsong('');
        } else {
          Toast.show({
            text: 'Something went wrong!',
            buttonText: 'Ok',
            duration: 3000,
            type: 'danger',
          });
        }
        break;
      case 'Hide_this_Song':
        const hideresults = await hidesong({
          song_id: songid,
        });
        if (hideresults.success) {
          await props.updatecurrentsong({hide: true});
          await props.userlikedsong('');
          await props.recentplayed();
          await props.getuserselectionsong();
          await props.heavyrotation();
          await props.getplaylist('');
          await props.userlikedsong('');
          await props.userAllsong('');
          await props.userAlbum('');
          Toast.show({
            text: hideresults.message,
            buttonText: 'Ok',
            duration: 3000,
            type: 'danger',
          });
        } else {
          Toast.show({
            text: 'Song is already hide!',
            buttonText: 'Ok',
            duration: 3000,
            type: 'danger',
          });
        }
        break;
      case 'Add_to_playlist':
        PushPropsScreen(ADD_SONG_PLAYLIST, props, true, {
          songid: songid,
        });
        break;
      case 'Play_back':
        let id = await TrackPlayer.getCurrentTrack();
        if (id) {
          TrackPlayer.pause();
          TrackPlayer.skip(id).then(() => TrackPlayer.play());
        }
        break;
      case 'Share':
        const url = 'https://mptone.com/';
        const title = 'MPTone';
        const message = 'Please download music app';
        const options = Platform.select({
          ios: {
            activityItemSources: [
              {
                placeholderItem: {type: 'url', content: url},
                item: {
                  default: {type: 'url', content: url},
                },
                subject: {
                  default: title,
                },
                linkMetadata: {originalUrl: url, url, title},
              },
              {
                // For sharing text.
                placeholderItem: {type: 'text', content: message},
                item: {
                  default: {type: 'text', content: message},
                  message: null, // Specify no text to share via Messages app.
                },
                linkMetadata: {
                  title: message,
                },
              },
              {
                // For using custom icon instead of default text icon at share preview when sharing with message.
                placeholderItem: {
                  type: 'url',
                },
                item: {
                  default: {
                    type: 'text',
                    content: `${message} ${url}`,
                  },
                },
                linkMetadata: {
                  title: message,
                },
              },
            ],
          },
          default: {
            title,
            subject: title,
            message: `${message} ${url}`,
          },
        });

        await Share.open(options);
        // PushPropsScreen(SHARE_SCREEN, props, false, musicurl);
        break;
      case 'Song_Credits':
        PushPropsScreen(SONGS_CREDIT_SCREEN, props, true, {
          songid: songid,
        });
        break;
      case 'View_Artist':
        PushPropsScreen(ARTIST_DETAIL_SCREEN, props, true, artistid);
        break;
      case 'Block_Artist':
        const hideartist = await hiddenArtist({artist_id: artistid});
        if (hideartist.success) {
          Alerts(hideartist.message, '', '');
          await props.userlikedsong('');
          await props.recentplayed();
          await props.getuserselectionsong();
          await props.heavyrotation();
          await props.getplaylist('');
          await props.userlikedsong('');
          await props.userAllsong('');
          await props.userAlbum('');
        } else {
          Alerts(hideartist.message, '', '');
        }
        break;
      case 'Download_this_Song':
        let resultsdownload = await updatedownloadhistory({
          song_id: songid,
          download: '1',
        });
        console.log('resultsdownload', resultsdownload);
        let user = await storage.getuser();
        const mp3url = musicurl;
        setloader(true);
        setTimeout(async () => {
          if (Platform.OS === 'ios') {
            RNFetchBlob.config({
              fileCache: true,
              appendExt: 'mp3',
              addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                mime: 'audio/mp3',
                title: songtitle,
                path: RNFetchBlob.fs.dirs.DownloadDir + `/MPTONE/${songtitle}`,
                description: 'Downloading the file',
              },
            })
              .fetch('GET', mp3url, {
                Authorization: `Token ${user.data.token}`,
              })
              .then((res) => res)
              .then(async (res) => {
                setloader(false);
                console.log('res', res);
                const shareOptions = {
                  title: 'Share file',
                  failOnCancel: false,
                  saveToFiles: true,
                  urls: [`file://${res.data}`], // base64 with mimeType or path to local file
                };
                const ShareResponse = await Share.open(shareOptions);
                setloader(false);
                // Alerts('File Download successfully', '', '');
              })
              .catch((err) => {
                console.log('err', err);
              });
          } else {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              RNFetchBlob.config({
                fileCache: true,
                appendExt: 'mp3',
                addAndroidDownloads: {
                  useDownloadManager: true,
                  notification: true,
                  mime: 'audio/mp3',
                  title: songtitle,
                  path:
                    RNFetchBlob.fs.dirs.DownloadDir + `/MPTONE/${songtitle}`,
                  description: 'Downloading the file',
                },
              })
                .fetch('GET', mp3url, {
                  Authorization: `Token ${user.data.token}`,
                })
                .then((res) => {
                  setloader(false);
                  // const shareOptions = {
                  //   title: 'Share file',
                  //   failOnCancel: false,
                  //   saveToFiles: true,
                  //   urls: [`file://${res.data}`], // base64 with mimeType or path to local file
                  // };
                  // const ShareResponse = await Share.open(shareOptions);
                  // console.log(JSON.stringify(ShareResponse, null, 2));
                  // Alerts('File Download successfully', '', '');
                })
                .catch((err) => {
                  setloader(false);
                  console.log('err', err);
                });
            }
          }
        }, 1000);
        break;
      case 'Report_Explicit_Content':
        const data = new FormData();
        data.append('song_id', props.state.id);
        const explicitresults = await reportsonexplicit(data);
        if (explicitresults.success) {
          Alerts(explicitresults.message, '', '');
        } else {
          Alerts(explicitresults.message, '', '');
        }
        break;
      default:
        break;
    }
  };
  const renderItem = (item, index) => (
    <TouchableOpacity
      key={`action${String(index)}${Date.now()}`}
      onPressIn={() => {
        setIndex(index);
        setTimeout(() => {
          setIndex('');
          showactions(item.title);
        }, 100);
      }}
      style={styles.liststyle}>
      <View style={styles.align}>
        {item.icon === 'folder-download' ? (
          <MaterialIcon
            name="folder-download"
            size={20}
            style={{
              ...styles.fontcolor,
              ...{color: index === currentindex ? '#01BDBD' : '#fff'},
            }}
          />
        ) : item.icon === 'heart' ? (
          like ? (
            <BlueHeart preserveAspectRatio="none" width={20} height={20} />
          ) : (
            <Heart preserveAspectRatio="none" width={20} height={20} />
          )
        ) : (
          <Icon
            name={item.icon}
            size={20}
            style={{
              ...styles.fontcolor,
              ...{color: index === currentindex ? '#01BDBD' : '#fff'},
            }}
          />
        )}
        <Text
          style={{
            ...styles.fontcolor,
            ...{
              color: index === currentindex ? '#01BDBD' : '#fff',
              fontSize: 16,
              paddingLeft: 15,
            },
          }}>
          {t(item.title)}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rightalign}>
        <TouchableOpacity
          style={styles.absolutealign}
          onPress={() => PopScreen(props, true)}>
          <Icons
            name="long-arrow-right"
            size={30}
            color="#fff"
            style={styles.fade}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content1}>
        <Image
          source={
            props.state &&
            props.Player &&
            props.Player.currentsong &&
            props.Player.currentsong.song_image
              ? {uri: apiurl.imageurl + props.Player.currentsong.song_image}
              : NoImage
          }
          style={styles.imagestyle}
          resizeMode="cover"
        />
        <Text style={{...styles.fontcolor, ...{fontSize: 16, paddingTop: 10}}}>
          {songtitle ? songtitle : ''}
        </Text>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={{
            ...styles.fontcolor,
            ...{fontSize: 12, opacity: 0.6, paddingTop: 5},
          }}>
          {songartist ? songartist : ''}
        </Text>
      </View>
      <View style={styles.content2}>
        <FlatList
          data={actions}
          renderItem={({item, index}) => renderItem(item, index)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
        {loader ? (
          <View
            style={{
              ...{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                bottom: height / 2,
              },
            }}>
            <ActivityIndicator size="large" />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
  Player: state.Player,
});

const mapDispatchToProps = {
  updatecurrentsong,
  userlikedsong,
  recentplayed,
  getuserselectionsong,
  heavyrotation,
  songstate,
  prevsong,
  nextsong,
  currentsong,
  currentplaylist,
  getplaylist,
  userAllsong,
  userAlbum,
};
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistAction);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  rightalign: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    top: 5,
    right: 10,
  },
  content1: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content2: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-end',
  },
  imagestyle: {
    width: 150,
    height: 150,
    borderRadius: 2,
  },
  fontcolor: {
    color: '#fff',
    fontWeight: '600',
  },
  liststyle: {
    margin: 10,
  },
  align: {
    flexDirection: 'row',
    padding: 5,
  },
  fade: {
    opacity: 0.5,
  },
  absolutealign: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
