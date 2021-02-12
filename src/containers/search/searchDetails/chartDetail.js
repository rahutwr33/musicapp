/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import MainHeaders from '../../../components/mainheader';
import {PopScreen} from '../../../navigation/pushscreen';
import {statusbarheight} from '../../../utils/statusbarheight';
import DropDownPicker from 'react-native-dropdown-picker';
import Player from '../../../components/miniplayer';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getcharts} from '../../../globals/store/actions/auth';
import {useTranslation} from 'react-i18next';

const {width, height} = Dimensions.get('window');

const dropdown = [
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '4',
    value: 4,
  },
  {
    label: '5',
    value: 5,
  },
  {
    label: '6',
    value: 6,
  },
  {
    label: '7',
    value: 7,
  },
  {
    label: '8',
    value: 8,
  },
  {
    label: '9',
    value: 9,
  },
  {
    label: '10',
    value: 10,
  },
];
const ChartDetailScreen = (props) => {
  const [value, setvalue] = useState(10);
  const [chart, setchart] = useState([]);
  const {t, i18n} = useTranslation();
  var date = new Date();
  var currentday = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  const getHistory = async () => {
    const result = await getcharts();
    if (result && result.success) {
      setchart(result.data);
    }
  };
  useEffect(() => {
    getHistory();
  }, []);
  const renderItem = ({item, index}) => (
    <View style={styles.liststyle}>
      <View style={{...{flex: 0.3}}}>
        <Text style={{color: '#fff', textAlign: 'center', paddingRight: 20}}>
          {++index}
        </Text>
        {++index % 2 === 0 ? (
          <Icon
            name="chevron-up"
            size={12}
            style={{color: '#01BDBD', textAlign: 'center', paddingRight: 20}}
          />
        ) : (
          <Icon
            name="chevron-down"
            size={12}
            style={{color: 'red', textAlign: 'center', paddingRight: 20}}
          />
        )}
      </View>
      <TouchableOpacity style={{...styles.align, ...{flex: 0.3}}}>
        <Text style={{...styles.fontstyle2, ...{textAlign: 'left'}}}>
          {item.total_listener}
        </Text>
      </TouchableOpacity>
      <View style={{...{flex: 0.4}}}>
        <Text style={{...styles.fontstyle2, ...{textAlign: 'left'}}}>
          {item.song_title}
        </Text>
        <Text
          style={{
            ...styles.fontstyle2,
            ...{textAlign: 'left', fontSize: 12, opacity: 0.5, paddingTop: 3},
          }}>
          Ava Max
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.MainContainer}>
      <MainHeaders
        title={t('CHARTS')}
        navigation={props.navigation}
        onPress={() => PopScreen(props)}
        righticon="long-arrow-right"
        leftonPress={() => {}}
      />
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
          <View style={{flex: 0.5}}>
            <Text style={{...styles.nrmlfnt, ...{fontSize: 16}}}>
              {t('Filter_Top')}
            </Text>
          </View>
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
          <View
            style={{
              flex: 0.5,
            }}
          />
        </View>
        <Text style={styles.fontstyle3}>as of {currentday}</Text>
      </View>
      <View
        style={{
          position: 'absolute',
          width: 100,
          height: height / 5,
          zIndex: 1,
          right: 20,
          top: width / 3.5,
        }}>
        <DropDownPicker
          items={dropdown}
          defaultValue={value}
          containerStyle={{height: 30}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) => {
            setvalue(item.value);
          }}
        />
      </View>
      <View style={styles.liststyle}>
        <TouchableOpacity style={{...styles.align, ...{flex: 0.3}}}>
          <Text style={{...styles.fontstyle2, ...{textAlign: 'center'}}}>
            Top
          </Text>
        </TouchableOpacity>
        <View style={{...{flex: 0.3}}}>
          <Text style={{...styles.fontstyle2, ...{textAlign: 'center'}}}>
            Top Listner
          </Text>
        </View>
        <View style={{...{flex: 0.4}}} />
      </View>
      <View style={styles.contentstyle}>
        <FlatList
          data={chart}
          renderItem={(item) => renderItem(item)}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Player />
    </View>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ChartDetailScreen);

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
  fontstyle3: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 10,
    marginLeft: 10,
  },
  spacestyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  divider: {
    alignSelf: 'center',
    width: width / 2,
    height: 1,
    backgroundColor: '#FFFFFF',
    marginTop: '10%',
  },
  align: {},
  iconstyle: {
    color: '#fff',
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
});
