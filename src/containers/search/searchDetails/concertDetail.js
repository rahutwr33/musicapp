/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import ConcertImage from '../../../assets/concert.jpeg';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {statusbarheight} from '../../../utils/statusbarheight';
import {SmallButton} from '../../../components/button';
import {ConcertList} from '../../../components/list';
import {PopScreen, PushPropsScreen} from '../../../navigation/pushscreen';
import {showsearchbar} from '../../../components/searchoverlay';
import {CONCERT_SEARCH_SCREEN, SEARCH_BAR} from '../../../navigation/screen';
import Player from '../../../components/miniplayer';
import {getconcertdetail} from '../../../globals/store/actions/song';
import {useTranslation} from 'react-i18next';

const ConcertScreen = (props) => {
  const [loader, setloader] = useState(false);
  const [data, setdata] = useState([]);
  const {t, i18n} = useTranslation();

  const opensearchbar = () => {
    PushPropsScreen(CONCERT_SEARCH_SCREEN, props, true, {
      placeholder: t('Search_by_city'),
    });
    // showsearchbar({Screen: SEARCH_BAR, placeholder: 'Search by city'});
  };
  const getconcert = async (id) => {
    const results = await getconcertdetail(id);
    if (results && results.status) {
      setdata(results.data);
      setloader(false);
    } else {
      setdata([]);
      setloader(false);
    }
  };
  useEffect(() => {
    if (props.state && props.state.item) {
      getconcert(props.state.item.city_id);
    }
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <ImageBackground
          source={ConcertImage}
          resizeMode="cover"
          style={styles.backgroundimagestyle}>
          <LinearGradient
            style={StyleSheet.absoluteFill}
            start={{x: 0, y: 0.3}}
            end={{x: 0, y: 1}}
            colors={['transparent', 'rgba(0, 0, 0, 0.2)', 'black']}
          />
          <View style={styles.topbtnstyle}>
            <View style={styles.space1} />
            <View>
              <Text style={styles.fontstyle}>{t('Concerts')}</Text>
            </View>
            <View style={styles.space2}>
              <TouchableOpacity onPress={() => PopScreen(props, true)}>
                <Icon name="long-arrow-right" size={25} color="#262626" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerTitlestyle}>
            <Text style={styles.maxfontstyle}>{t('Concerts')}</Text>
            <Text style={styles.maxfontstyle}>
              {props?.state?.item?.city_name || ''} {t('City')}
            </Text>
            <SmallButton
              buttonTitle={t('Change_Location')}
              onPress={() => opensearchbar()}
            />
          </View>
        </ImageBackground>
      </View>
      <View style={styles.flex}>
        <ConcertList item={data} />
      </View>
      <Player />
    </View>
  );
};
export default ConcertScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitlestyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.7,
  },
  flex: {
    flex: 0.5,
    backgroundColor: '#000',
  },
  linargradientstyle: {
    flex: 1,
  },
  backgroundimagestyle: {
    flex: 1,
  },
  topbtnstyle: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 100,
    paddingTop: statusbarheight + 10,
  },
  space1: {
    paddingLeft: 20,
  },
  space2: {
    paddingRight: 20,
  },
  fontstyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  maxfontstyle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '500',
  },
});
