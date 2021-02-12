/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import MainHeaders from '../../components/mainheader';
import {PopScreen} from '../../navigation/pushscreen';
import {statusbarheight} from '../../utils/statusbarheight';
import Player from '../../components/miniplayer';
import {getcharts} from '../../globals/store/actions/song';
// import {data} from './data';
import {useTranslation} from 'react-i18next';
const {width, height} = Dimensions.get('window');
import {LineChart} from 'react-native-chart-kit';
import tooltipDecorators from '../../utils/charttooltip';
var data = {
  labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  datasets: [
    {
      data: [0],
    },
  ],
};
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const chartConfigs = [
  {
    backgroundGradientFrom: '#00F6F3',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 'rgba(0, 246, 243, 0.3)',
    backgroundGradientToOpacity: 0.5,
    backgroundColor: '#C4C4C4',
    color: (opacity = 1) => 'rgba(1, 189, 189)',
    style: {
      borderRadius: 5,
    },
  },
];
const ChartScreen = (props) => {
  var date = new Date();
  var currentday = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  const {t, i18n} = useTranslation();
  const [title] = useState(props?.state?.title || '');
  const [tooltip, settooltip] = useState(null);
  const [chart, setchart] = useState([]);
  const [loader, setloader] = useState(false);
  var [xvalue, setxvalue] = useState([]);
  var [yvalue, setyvalue] = useState([]);

  const getanalysticsdata = async () => {
    setloader(true);
    const results = await getcharts();
    if (results && results.success) {
      setloader(false);
      if (title === 'New Followers') {
        setchart(results.data.follower);
      }
      if (title === 'Daily Listner') {
        console.log(11111);
        setchart(results.data.listener.today);
        setyvalue([results.data.listener.today]);
        data.datasets[0].data = [results.data.listener.today];
      }
      if (title === 'Weekely Listner') {
        setchart(results.data.listener.weekly);
        xvalue = Object.keys(results.data.listener.weekly);
        yvalue = Object.values(results.data.listener.weekly);
        setxvalue(...xvalue);
        setyvalue(...yvalue);
        data.datasets[0].data = yvalue;
      }
      if (title === 'Monthly Listner') {
        setchart(results.data.listener.month);
        xvalue = Object.keys(results.data.listener.month);
        yvalue = Object.values(results.data.listener.month);
        setxvalue(...xvalue);
        setyvalue(...yvalue);
        data.datasets[0].data = yvalue;
      }
      if (title === 'Downloads') {
        setchart(results.data.listener.month);
        xvalue = Object.keys(results.data.download.weekly);
        yvalue = Object.values(results.data.download.weekly);
        setxvalue(...xvalue);
        setyvalue(...yvalue);
        data.datasets[0].data = yvalue;
      }
    }
  };
  useEffect(() => {
    getanalysticsdata();
  }, []);
  useEffect(() => {}, [yvalue]);

  return (
    <View style={styles.MainContainer}>
      <MainHeaders
        title={title}
        navigation={props.navigation}
        onPress={() => PopScreen(props)}
        righticon="long-arrow-right"
        leftonPress={() => {}}
      />
      {loader ? (
        <View style={styles.top}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{...{flex: 1}}}>
          <View style={styles.top}>
            <View style={styles.analyticinfo}>
              <View style={{flex: 0.5}}>
                <Text style={styles.nrmlfnt}>
                  <View style={styles.line} /> {t('Today')}
                </Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={styles.nrmlfnt}>
                  <View style={styles.line} />
                  {t('Weekley')}
                </Text>
              </View>
              <View style={{flex: 0.5}} />
            </View>
            <View style={styles.analyticinfo}>
              <View style={{flex: 0.5}}>
                <Text style={styles.nrmlfnt}>
                  <View style={styles.line} /> {t('Yesterday')}
                </Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={styles.nrmlfnt}>
                  <View style={styles.line} />
                  {t('Monthly')}
                </Text>
              </View>
              <View style={{flex: 0.5}} />
            </View>
            <Text style={styles.fontstyle3}>
              as of {date.getDate()} - {monthNames[date.getMonth()]}{' '}
              {date.getFullYear()}
            </Text>
          </View>
          <View style={styles.contentstyle}>
            <View style={styles.chartstyle}>
              {chartConfigs.map((chartConfig) => {
                const graphStyle = {
                  marginVertical: 8,
                  ...chartConfig.style,
                };
                return (
                  <LineChart
                    data={data}
                    width={width - 40}
                    height={height / 2}
                    chartConfig={chartConfig}
                    bezier
                    style={graphStyle}
                    withInnerLines={false}
                    withDots={true}
                    decorator={tooltipDecorators(tooltip, data)}
                    onDataPointClick={(e) => {
                      settooltip(e);
                    }}
                  />
                );
              })}
            </View>
          </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(ChartScreen);

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    marginTop: statusbarheight,
  },
  analyticinfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  nrmlfnt: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '700',
    paddingLeft: 5,
    paddingTop: 5,
    textAlign: 'center',
  },
  line: {
    width: 30,
    height: 3,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  top: {
    marginTop: 10,
  },
  fontstyle3: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 10,
    marginLeft: 10,
  },
  contentstyle: {
    flex: 1,
    marginTop: 10,
  },
  chartstyle: {
    height: height / 2,
    margin: 20,
  },
});
