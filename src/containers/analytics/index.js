import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import MainHeaders from '../../components/mainheader';
import {PopScreen, PushPropsScreen} from '../../navigation/pushscreen';
import {statusbarheight} from '../../utils/statusbarheight';
import Icons from 'react-native-vector-icons/FontAwesome';
import {TOPMOSTLISTENER, CHART_SCREEN} from '../../navigation/screen';
import Player from '../../components/miniplayer';
import {getanalytics} from '../../globals/store/actions/song';
import {data} from '../../utils/data/analytics';
import {useTranslation} from 'react-i18next';

const width = Dimensions.get('window').width;

const AnalyticsScreen = (props) => {
  const [state, setstate] = useState([]);
  const [loader, setloader] = useState(false);
  const {t, i18n} = useTranslation();

  const getanalysticsdata = async () => {
    setloader(true);
    const results = await getanalytics();
    if (results && results.success) {
      setloader(false);
      setstate(results.data);
    }
  };
  useEffect(() => {
    getanalysticsdata();
  }, []);
  const showchart = (item) => {
    switch (item) {
      case 'Top Most Listened Tracks':
        PushPropsScreen(TOPMOSTLISTENER, props, true, item);
        break;
      default:
        PushPropsScreen(CHART_SCREEN, props, true, {title: t(item)});
        break;
    }
  };
  const renderItem = ({item}) => (
    <View style={styles.liststyle}>
      <View style={{...{flex: 0.9}}}>
        <Text style={{...styles.fontstyle2, ...{textAlign: 'left'}}}>
          {t(item.title)}
        </Text>
        <Text
          style={{...styles.fontstyle, ...{textAlign: 'left', paddingTop: 5}}}>
          {item.title === 'New Followers' && state.new_followers
            ? state.new_followers[0]
            : ''}
          {item.title === 'Daily Listner' && state.daily_listener
            ? state.daily_listener[0]
            : ''}
          {item.title === 'Weekely Listner' && state.weekly_listener
            ? state.weekly_listener[0]
            : ''}
          {item.title === 'Monthly Listner' && state.monthly_listener
            ? state.monthly_listener[0]
            : ''}
          {item.title === 'Downloads' && state.downloads
            ? state.downloads[0]
            : ''}
          {item.title === 'Top Most Listened Tracks' &&
          state.top_most_listened_track
            ? state.top_most_listened_track
            : ''}
        </Text>
      </View>
      <TouchableOpacity
        style={{...styles.align, ...{flex: 0.1}}}
        onPress={() => showchart(item.title)}>
        <Icons size={16} name="ellipsis-v" style={styles.iconstyle} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.MainContainer}>
      <MainHeaders
        title={t('Analytics')}
        navigation={props.navigation}
        onPress={() => PopScreen(props)}
        righticon="long-arrow-right"
        leftonPress={() => {}}
      />
      {loader ? (
        <View style={styles.contentstyle}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.contentstyle}>
          <View style={styles.spacestyle}>
            <TouchableOpacity>
              <Text style={styles.fontstyle}>
                {state.total_songs ? state.total_songs[0] : 0}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.fontstyle2}>{t('Total_Songs')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spacestyle}>
            <TouchableOpacity>
              <Text style={styles.fontstyle}>
                {state.total_albums ? state.total_albums[0] : 0}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.fontstyle2}>{t('Total_Album')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <FlatList
            data={data}
            renderItem={(item) => renderItem(item)}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      <Player />
    </View>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsScreen);

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    marginTop: statusbarheight,
  },
  contentstyle: {
    flex: 1,
    padding: 20,
    marginBottom: 60,
  },
  liststyle: {
    flexDirection: 'row',
    marginTop: 30,
  },
  fontstyle: {
    color: '#01BDBD',
    fontSize: 24,
    fontWeight: '700',
  },
  fontstyle2: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  spacestyle: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginTop: 10,
  },
  divider: {
    alignSelf: 'center',
    width: width / 2,
    height: 1,
    backgroundColor: '#FFFFFF',
    marginTop: '10%',
  },
  align: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconstyle: {
    color: '#fff',
  },
});
