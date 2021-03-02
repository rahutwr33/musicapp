/* eslint-disable handle-callback-err */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  TextInput,
  Platform,
  Linking
} from 'react-native';
import {connect} from 'react-redux';
import Player from '../../components/miniplayer';
import {statusbarheight} from '../../utils/statusbarheight';
import MainHeaders from '../../components/mainheader';
import {PushScreen} from '../../navigation/pushscreen';
import {SIDEBAR_SCREEN, ADD_SONG_TO_ALBUM} from '../../navigation/screen';
import {Content} from 'native-base';
import {Button} from '../../components/button';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import api from '../../config/api';
import storage from '../../utils/storage';
import {Alerts} from '../../utils/alert';
import {ProgressView} from '@react-native-community/progress-view';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import {Button as NativeButton} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {PickerScreen} from '../../components/picker';
import {SongsCreditScreen} from '../../components/songscredit';
import {
  addalbum,
  userAllsong,
  userAlbum,
} from '../../globals/store/actions/playlist';
import {submitqueuesong} from '../../globals/store/actions/song';
import {useTranslation} from 'react-i18next';

const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const {width, height} = Dimensions.get('window');
const UploadScreen = (props) => {
  const {t, i18n} = useTranslation();
  const [genre_id, setgenreid] = useState('');
  const [genrearr, setgenreArr] = useState([]);
  const [token, setToken] = useState('');
  const [song_title, setsongtitle] = useState('');
  const [song_mp3, setmp3] = useState({});
  const [song_credit, setsongcredit] = useState('');
  const [song_image, setAvatar] = useState('');
  const [imagepath, setimagepath] = useState('');
  const [progressbar, setprogreebar] = useState(0);
  const [showprogreebar, setshowprogreebar] = useState(false);
  const [percentageupload, setpercentage] = useState(0);
  const [btndisable, setbtndisable] = useState(false);
  const [pickerstatus, showpicker] = useState(false);
  const [form, setform] = useState(0);
  const [songcreditstatus, showsongcredit] = useState(false);
  const [company, setcompany] = useState('');
  const [albumsong, setalbum] = useState([]);
  const [loader, setloader] = useState(false);
  const [alertmessage, setalertmessage] = useState(false);
  
  let [performedbyArr, setperformedbyArr] = useState([
    {
      index: 0,
    },
  ]);
  let [writtenbyArr, setwrittenbyArr] = useState([
    {
      index: 0,
    },
  ]);
  let [producedbyArr, setproducedbyArr] = useState([
    {
      index: 0,
    },
  ]);
  let [sourcesArr, setsourcedArr] = useState([
    {
      index: 0,
    },
  ]);
  

  useEffect(() => {
    if (props && props.Auth && props.Auth.genre) {
      setgenreArr(props.Auth.genre);
    }
    storage.getuser().then((response) => {
      setToken(response.data.token);
    });
  }, []);

  useEffect(() => {
    if (song_image && song_image.uri) {
      let path = song_image.uri;
      if (Platform.OS === 'ios') {
        path = '~' + path.substring(path.indexOf('/Documents'));
      } else {
        path = song_image.uri;
      }
      if (!song_image.fileName) {
        setimagepath(path.split('/').pop());
      } else {
        setimagepath(song_image.fileName);
      }
    }
  }, [song_image]);

  const opensongsList = () => {
    PushScreen(ADD_SONG_TO_ALBUM, props, true, 0);
  };

  const chooseImage = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log(response);
        setAvatar(response);
      }
    });
  };
  const choosefile = async () => {
    try {
      setalertmessage(true);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('cancel');
      } else {
        console.log(err);
      }
    }
  };

  const selectsong = async ()=> {
      if (form === 0) {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.audio],
        });
        if (Platform.OS === 'ios') {
          const split = res.uri.split('/');
          const name = split.pop();
          const inbox = split.pop();
          var realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
          realPath = realPath.replace('file://', '');
        } else {
          const split = res.uri.split('/');
          const name = split.pop();
          const inbox = split.pop();
          var realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
          realPath = res.uri;
        }
        setmp3({uri: realPath, type: res.type, name: res.name});
      }
      if (form === 1) {
        opensongsList();
      }
  }
  const validateData = async () => {
    if (!song_title) {
      return 'Song title character should be greater than 3';
    } else {
      if (!genre_id || !genre_id) {
        return 'Please select genre';
      } else {
        if (!song_mp3 || Object.keys(song_mp3).length === 0) {
          return 'Please upload song';
        } else {
          // if (!song_image || Object.keys(song_image).length === 0) {
          //   return 'Please upload song thumbnail';
          // } else {
          return 'success';
          // }
        }
      }
    }
  };

  const validateAlbumData = async () => {
    if (!song_title) {
      return 'Song title character should be greater than 3';
    } else {
      // if (!song_image || Object.keys(song_image).length === 0) {
      //   return 'Please upload song thumbnail';
      // } else {
      if (!albumsong || albumsong.length === 0) {
        return 'Please select song';
      } else {
        return 'success';
      }
      // }
    }
  };
  const resetform = async () => {
    setgenreid('');
    setsongtitle('');
    setmp3({});
    setsongcredit('');
    setAvatar('');
    setimagepath('');
    setprogreebar(0);
    setshowprogreebar(false);
    setpercentage(0);
    setbtndisable(false);
    showpicker(false);
    setcompany('');
    setalbum([]);
    setloader(false);
    setperformedbyArr([
      {
        index: 0,
      },
    ]);
    setwrittenbyArr([
      {
        index: 0,
      },
    ]);
    setproducedbyArr([
      {
        index: 0,
      },
    ]);
    setsourcedArr([
      {
        index: 0,
      },
    ]);

    await props.submitqueuesong('');
  };
  useEffect(() => {
    if (
      props &&
      props.Song &&
      props.Song.queuealbum &&
      Array.isArray(props.Song.queuealbum)
    ) {
      setalbum(props.Song.queuealbum);
    }
  }, [props]);

  const upload = async () => {
    if (form === 0) {
      let performby = performedbyArr.map((key) => {
        return key.value;
      });
      let writtenby = writtenbyArr.map((key) => {
        return key.value;
      });
      let producedby = producedbyArr.map((key) => {
        return key.value;
      });
      let sources = sourcesArr.map((key) => {
        key.source = key.value;
        return key.value;
      });

      const validate = await validateData();
      if (validate === 'success') {
        setshowprogreebar(true);
        setbtndisable(true);
        if (song_image && song_image.uri) {
          let path = song_image.uri;
          if (Platform.OS === 'ios') {
            path = '~' + path.substring(path.indexOf('/Documents'));
          }
          if (!song_image.fileName) {
            song_image.fileName = path.split('/').pop();
          }
        }
        const filearr = [
          {
            name: 'song_mp3',
            filename: song_mp3.name,
            type: song_mp3.type,
            data:
              Platform.OS === 'ios'
                ? decodeURIComponent(RNFetchBlob.wrap(song_mp3.uri))
                : RNFetchBlob.wrap(song_mp3.uri),
          },
          {name: 'genre_id', data: genre_id.toString()},
          {name: 'song_credit', data: song_credit},
          {name: 'song_title', data: song_title},
          {name: 'company_label', data: company},
          {name: 'performed_by', data: JSON.stringify(performby)},
          {name: 'produced_by', data: JSON.stringify(producedby)},
          {name: 'written_by', data: JSON.stringify(writtenby)},
          {name: 'source', data: JSON.stringify(sources)},
        ];
        if (song_image.fileName) {
          filearr.push({
            name: 'song_image',
            filename: song_image.fileName,
            type: song_image.type,
            data: RNFetchBlob.wrap(
              Platform.OS === 'android'
                ? song_image.uri
                : song_image.uri.replace('file://', ''),
            ),
          });
        }
        setTimeout(() => {
          RNFetchBlob.config({
            fileCache: false,
            mime: 'image/mp3',
            mediaScannable: true,
            notification: true,
          })
            .fetch(
              'POST',
              `${api.apiBaseUrl}/${api.prefixurl}/song-view`,
              {
                Authorization: `Token ${token}`,
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
              filearr,
            )
            .uploadProgress((written, total) => {
              setprogreebar(written / total);
              setpercentage(Math.round((written * 100) / total));
            })
            .progress((received, total) => {
              setpercentage(100);
              setprogreebar(1);
              setbtndisable(false);
              Alerts('Success.', '', '');
            })
            .then((resp) => {
              if (resp) {
                resetform();
                setbtndisable(false);
              }
            })
            .catch((err) => {
              console.log(err);
              Alerts('Something went wrong.Please try again!', '', '');
              setbtndisable(false);
            });
        }, 2000);
      } else {
        setbtndisable(false);
        Alerts(validate, '', '');
      }
    } else {
      const validate = await validateAlbumData();
      if (validate === 'success') {
        setbtndisable(true);
        setloader(true);
        var idarr = albumsong.map((key) => {
          return key.id;
        });
        idarr = idarr.join(',');
        const data = new FormData();
        data.append('album_name', song_title);
        if (song_image && imagepath) {
          data.append('album_pic', {
            name: imagepath,
            type: song_image.type,
            uri:
              Platform.OS === 'android'
                ? song_image.uri
                : song_image.uri.replace('file://', ''),
          });
        }
        data.append('song_id', idarr);
        const uploadalbum = await addalbum(data);
        if (uploadalbum && uploadalbum.success) {
          await props.userAlbum('');
          Alerts(uploadalbum.message, '', '');
          resetform();
          setloader(false);
        }
      } else {
        setbtndisable(false);
        Alerts(validate, '', '');
      }
    }
  };
  const openPicker = () => {
    if (pickerstatus) {
      return (
        <PickerScreen
          setgenreid={(e) => setgenreid(e)}
          showpicker={(e) => showpicker(e)}
          genrearr={genrearr}
          genre_id={genre_id}
        />
      );
    } else {
      return null;
    }
  };
  const onChangeText = (e, index, arr, setarr) => {
    arr.map((key) => {
      if (key.index === index) {
        key.value = e;
      }
    });
    setarr([...arr]);
  };

  let removeinput = (index, arr, setarr) => {
    arr.splice(index, 1);
    setarr([...arr]);
    console.log(arr);
  };

  const addperformed = (index, arr, setarr) => {
    setarr([
      ...arr,
      {
        index: index,
      },
    ]);
  };
  return (
    <View style={styles.safeview}>
      <MainHeaders
        title={`${t('Upload')} ${t('Song')}`}
        navigation={props.navigation}
        onPress={() => PushScreen(SIDEBAR_SCREEN, props, true, 0)}
        righticon="long-arrow-right"
        leftonPress={() => {}}
      />
      <Content>
        <View style={{marginBottom: 60}}>
          <View
            style={{
              ...styles.space,
              ...{
                flexDirection: 'row',
                alignSelf: 'flex-start',
                paddingLeft: 0,
              },
            }}>
            <TouchableOpacity
              onPress={() => setform(0)}
              style={
                form === 0
                  ? {
                      ...{
                        borderColor: '#01BDBD',
                        borderWidth: 1,
                        marginLeft: 10,
                        marginRight: 10,
                        backgroundColor: '#474747',
                        borderRadius: 10,
                      },
                    }
                  : {}
              }>
              <Text
                style={[styles.headingstyle, {opacity: form === 0 ? 1 : 0.5}]}>
                {t('Single')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setform(1)}
              style={
                form === 1
                  ? {
                      ...{
                        borderColor: '#01BDBD',
                        borderWidth: 1,
                        marginLeft: 10,
                        marginRight: 10,
                        backgroundColor: '#474747',
                        borderRadius: 10,
                      },
                    }
                  : {}
              }>
              <Text
                style={[styles.headingstyle, {opacity: form === 1 ? 1 : 0.5}]}>
                {t('Album')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.content]}>
            <View style={styles.space}>
              <Text style={styles.textstyle}>{t('Title')}</Text>
              <TextInput
                autoCapitalize="none"
                style={styles.inputstyle}
                value={song_title}
                onChangeText={(e, index) => setsongtitle(e, index)}
              />
            </View>
            {form === 0 ? (
              <View style={styles.space}>
                <Text style={styles.textstyle}>{t('Label_company')}</Text>
                <TextInput
                  autoCorrect={false}
                  autoCompleteType="off"
                  autoCapitalize="none"
                  style={styles.inputstyle}
                  onChangeText={(e) => setcompany(e)}
                />
              </View>
            ) : null}
            <View style={styles.space}>
              <Text style={styles.textstyle}>
                {form === 0 ? t('Thumbnail_Song_Cover') : t('Album_Song_Cover')}
              </Text>
              <TouchableOpacity
                style={styles.iconsstyle}
                onPress={() => chooseImage()}>
                <View style={styles.btnstyle}>
                  <Text style={styles.textstyle2}>{t('Upload')}</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.textstyle3}>{imagepath}</Text>
            </View>
            <View style={styles.space}>
              <Text style={styles.textstyle}>
                {form === 0 ? t('File_upload') : t('Select_song')}
              </Text>
              <TouchableOpacity
                style={styles.iconsstyle}
                onPress={() => choosefile()}>
                <View style={styles.btnstyle}>
                  <Text style={styles.textstyle2}>{t('Upload')}</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.textstyle3}>
                {form === 0
                  ? song_mp3.name
                  : `${albumsong.length} ${t('Song_select')}`}
              </Text>
            </View>
            {form === 0 ? (
              <View
                style={{
                  ...styles.space,
                  ...{marginLeft: 30, width: width - 30},
                }}>
                <Text style={styles.textstyle}>{t('Select_Genre')}</Text>
                {Platform.OS === 'ios' ? (
                  <TouchableOpacity
                    style={styles.borderInput}
                    onPress={() => showpicker(true)}>
                    <Icon
                      style={styles.searchIcon}
                      name="chevron-down"
                      size={16}
                      color="#929292"
                    />
                    <Text style={styles.emailInput}>
                      {genre_id ? genre_id.genre : t('Select_Genre')}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <PickerScreen
                    setgenreid={(e) => setgenreid(e)}
                    showpicker={(e) => showpicker(e)}
                    genrearr={genrearr}
                    genre_id={genre_id}
                  />
                )}
              </View>
            ) : null}
          </View>
          {form === 0 ? (
            <View
              style={{
                ...styles.space,
                ...{
                  alignSelf: 'flex-start',
                  paddingLeft: 0,
                  marginLeft: 0,
                  left: 0,
                },
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row', marginLeft: 10}}
                onPress={() => {
                  showsongcredit(!songcreditstatus);
                }}>
                <Text style={styles.textstyle}>{t('Songs_Credit')}</Text>
                <Icon
                  style={{...styles.searchIcon, ...{paddingTop: 7}}}
                  name="chevron-right"
                  size={16}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          ) : null}
          {songcreditstatus && form === 0 ? (
            <View style={{alignSelf: 'flex-start'}}>
              <SongsCreditScreen
                onperformedpress={(index) =>
                  addperformed(index, performedbyArr, setperformedbyArr)
                }
                performedbyArr={performedbyArr}
                onChangeText={(e, index) =>
                  onChangeText(e, index, performedbyArr, setperformedbyArr)
                }
                removeinput={(index) =>
                  removeinput(index, performedbyArr, setperformedbyArr)
                }
                onwrittenbyArr={(index) =>
                  addperformed(index, writtenbyArr, setwrittenbyArr)
                }
                writtenbyArr={writtenbyArr}
                onChangewrittenText={(e, index) =>
                  onChangeText(e, index, writtenbyArr, setwrittenbyArr)
                }
                removewritteninput={(index) =>
                  removeinput(index, writtenbyArr, setwrittenbyArr)
                }
                onproducedbyArr={(index) =>
                  addperformed(index, producedbyArr, setproducedbyArr)
                }
                producedbyArr={producedbyArr}
                onChangeproducedbyArrText={(e, index) =>
                  onChangeText(e, index, producedbyArr, setproducedbyArr)
                }
                removeproducedbyArrinput={(index) =>
                  removeinput(index, producedbyArr, setproducedbyArr)
                }
                onsourcesArr={(index) =>
                  addperformed(index, sourcesArr, setsourcedArr)
                }
                sourcesArr={sourcesArr}
                onChangesourcesArrText={(e, index) =>
                  onChangeText(e, index, sourcesArr, setsourcedArr)
                }
                removesourcesArrinput={(index) =>
                  removeinput(index, sourcesArr, setsourcedArr)
                }
              />
            </View>
          ) : null}
          {form === 1 && loader ? (
            <View style={{...{alignSelf: 'center'}}}>
              <ActivityIndicator size="large" />
            </View>
          ) : null}
          <Button
            buttonTitle={t('Upload')}
            onPress={() => upload()}
            disabled={btndisable}
          />
        </View>
      </Content>
      {pickerstatus ? (
        <View
          style={[
            styles.space,
            {
              position: 'absolute',
              top: height / 3,
              width: width,
              height: 100,
            },
          ]}>
          {openPicker()}
        </View>
      ) : null}
      {alertmessage ? (
        <View
          style={[
            styles.space,
            {
              position: 'absolute',
              top: height / 3,
              width: width,
              height: Platform.OS == "ios" ? 150 : 180,
              backgroundColor: 'white'
            },
          ]}>
          <View>
             <Text style={{textAlign: 'center', fontSize: 16,fontWeight: '600',paddingTop: 5}}>Choose a file to upload from your device</Text>
          </View>
          <View style={{padding: 10}}>
             <Text style={{textAlign: 'center', fontSize: 14,fontWeight: '300', flexWrap:'wrap'}}>
             By uploading, you confirm that your sounds conform with our <Text onPress={()=>{
               Linking.canOpenURL('https://www.mptone.com/en/terms-conditions/').then(
                (supported) => {
                  if (supported) {
                    Linking.openURL('https://www.mptone.com/en/terms-conditions/');
                  } else {
                    console.log("Don't know how to open URI: " + this.props.url);
                  }
                },
              );
             }} style={{color: '#0366d6', fontWeight: '700'}}>Term of Use</Text> and you don't infringe on anyone else's rights.
             </Text>
          </View>
          <View style={{alignSelf: 'center', paddingTop: 10}}>
            <NativeButton 
              onPress={()=> {
                setalertmessage(false);
                selectsong();
              }}
              style={{
              backgroundColor: '#0366d6',
              marginTop: 10,
              opacity: 0.8,
              alignSelf: 'center',
            }}><Text style={{
              color: '#fff',
              fontWeight: '600',
              paddingLeft: 20,
              paddingRight: 20,
            }}>OK</Text></NativeButton></View>
        </View>
      ) : null}
      {showprogreebar ? (
        <View
          style={{
            position: 'absolute',
            top: height / 3,
            width: width - 30,
            borderRadius: 10,
            height: 150,
            backgroundColor: '#01BDBD',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {Platform.OS === 'ios' ? (
            <ProgressView
              progressTintColor="green"
              trackTintColor="#fff"
              progress={progressbar}
              style={{width: width - 60}}
            />
          ) : null}
          {Platform.OS === 'android' ? (
            <ProgressBar
              styleAttr="Horizontal"
              indeterminate={false}
              progress={progressbar}
              style={{width: width - 60}}
            />
          ) : null}

          <Text style={{marginTop: 10, color: '#fff', fontWeight: '900'}}>
            {percentageupload || 'Loading...'} {t('Percent_complete')}
          </Text>
          <NativeButton
            onPress={async () => {
              await props.userAllsong('');
              setshowprogreebar(false);
              setbtndisable(false);
              setpercentage(0);
              setprogreebar(0);
            }}
            style={{
              backgroundColor: '#fff',
              marginTop: 10,
              opacity: 0.8,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: '900',
                paddingLeft: 20,
                paddingRight: 20,
              }}>
              Close
            </Text>
          </NativeButton>
        </View>
      ) : null}
      <Player />
    </View>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
  Song: state.Song,
});

const mapDispatchToProps = {userAllsong, submitqueuesong, userAlbum};
export default connect(mapStateToProps, mapDispatchToProps)(UploadScreen);

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    marginTop: statusbarheight,
  },
  container: {
    backgroundColor: '#262626',
  },
  space: {
    marginTop: 10,
  },
  content: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flex: 1,
    padding: 20,
  },
  textstyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    padding: 5,
    textAlign: 'left',
  },
  headingstyle: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '700',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textstyle3: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '900',
    padding: 5,
    textAlign: 'center',
  },
  btnstyle: {
    backgroundColor: '#01BDBD',
    borderRadius: 15,
  },
  textstyle2: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 3,
    paddingBottom: 3,
  },
  inputstyle: {
    borderColor: '#fff',
    borderWidth: 1,
    marginTop: 10,
    width: width - 30,
    padding: 10,
    borderRadius: 5,
    color: '#fff',
    textAlign: 'left',
  },
  iconsstyle: {
    borderColor: '#fff',
    borderWidth: 1,
    marginTop: 10,
    width: width - 30,
    padding: 19,
    borderRadius: 5,
    alignItems: 'flex-start',
  },
  borderInput: {
    borderColor: '#ffffff',
    borderWidth: 1,
    flexDirection: 'row-reverse',
    padding: 15,
    borderRadius: 5,
  },
  searchIcon: {
    paddingLeft: 15,
  },
  emailInput: {
    color: '#ffffff',
  },
});
