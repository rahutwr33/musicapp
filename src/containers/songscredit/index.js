import {Content} from 'native-base';
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MainHeaders from '../../components/mainheader';
import {getsongscredt} from '../../globals/store/actions/song';
import {PopScreen, PushScreen} from '../../navigation/pushscreen';
import {useTranslation} from 'react-i18next';
import {REPORT_SCREEN} from '../../navigation/screen';

const {width, height} = Dimensions.get('window');
export const SongsCredit = (props) => {
  const [state, setstate] = useState([]);
  const [loader, setloader] = useState(false);
  const {t, i18n} = useTranslation();

  const getanalysticsdata = async () => {
    setloader(true);
    if (props.state.songid) {
      const results = await getsongscredt({song_id: props.state.songid});
      if (results && results.success) {
        setloader(false);
        setstate(results.data);
      }
    }
  };
  useEffect(() => {
    getanalysticsdata();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {loader ? (
        <Content>
          <MainHeaders
            title={t('Song_Credits')}
            navigation={props.navigation}
            onPress={() => PopScreen(props)}
            righticon="long-arrow-right"
            leftonPress={() => {}}
          />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        </Content>
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.headerstyle}>
            <View style={{flex: 0.5}} />
            <View style={styles.flex}>
              <Text style={styles.fontcolor}>{state.song_title}</Text>
            </View>
            <View style={{flex: 0.5}}>
              <TouchableOpacity
                style={styles.btnstyle}
                onPress={() => PopScreen(props)}>
                <Text style={styles.smallfontcolor}>{t('Cancel')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.center}>
            <Text style={styles.fontcolor}>{t('Performed_by')}</Text>
            <Text style={styles.lightfontcolor}>
              {state.song_credit && state.song_credit.performed_by
                ? state.song_credit.performed_by[0] || ''
                : ''}
            </Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.fontcolor}>{t('Written_by')}</Text>
            <Text style={styles.lightfontcolor}>
              {state.song_credit && state.song_credit.written_by
                ? state.song_credit.written_by[0] || ''
                : ''}
            </Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.fontcolor}>{t('Produced_by')}</Text>
            <Text style={styles.lightfontcolor}>
              {state.song_credit && state.song_credit.produced_by
                ? state.song_credit.produced_by[0] || ''
                : ''}
            </Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.fontcolor}>{t('Sources')}</Text>
            <Text style={styles.lightfontcolor2}>
              {state.song_credit && state.song_credit.source
                ? state.song_credit.source[0] || ''
                : ''}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.rowstyle}
            onPress={() =>
              PushScreen(REPORT_SCREEN, props, true, props.state.songid)
            }>
            <View style={{flex: 0.5}} />
            <View style={{flex: 0.1}}>
              <Icon name="chevron-left" size={16} style={styles.iconcolor} />
            </View>
            <View style={{flex: 0.4, marginLeft: 20}}>
              <Text style={styles.fontstyle3}>{t('Report_Error')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerstyle: {
    justifyContent: 'space-between',
    height: 50,
    flexDirection: 'row',
    marginTop: 10,
  },
  fontcolor: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  smallfontcolor: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    paddingLeft: 10,
    textAlign: 'center',
    paddingRight: 10,
  },
  btnstyle: {
    borderRadius: 15,
    backgroundColor: '#01BDBD',
    marginRight: 10,
    width: null,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    marginTop: height / 8,
  },
  rowstyle: {
    flexDirection: 'row',
    marginTop: 80,
  },
  lightfontcolor: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.5,
    position: 'absolute',
    top: 50,
    right: 20,
  },
  lightfontcolor2: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.5,
    position: 'absolute',
    top: 50,
    paddingLeft: width / 3,
  },
  iconcolor: {
    color: '#fff',
  },
  fontstyle3: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.5,
  },
});
