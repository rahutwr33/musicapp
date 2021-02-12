/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import MainHeaders from '../../components/mainheader';
import {PopScreen} from '../../navigation/pushscreen';
import {statusbarheight} from '../../utils/statusbarheight';
import DropDownPicker from 'react-native-dropdown-picker';
import Player from '../../components/miniplayer';

const {width, height} = Dimensions.get('window');

const data = [
  {
    title: 'Lover',
  },
  {
    title: 'Love Story',
  },
  {
    title: 'White Horse',
  },
  {
    title: 'Bad Blood',
  },
  {
    title: 'Easier',
  },
  {
    title: 'Yellow',
  },
  {
    title: 'White Horse',
  },
  {
    title: 'Bad Blood',
  },
  {
    title: 'Easier',
  },
];
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
const TopMostListenedScreen = (props) => {
  const [value, setvalue] = useState(10);
  const renderItem = ({item}) => (
    <View style={styles.liststyle}>
      <TouchableOpacity style={{...styles.align, ...{flex: 0.5}}}>
        <Text style={{...styles.fontstyle2, ...{textAlign: 'left'}}}>4238</Text>
      </TouchableOpacity>
      <View style={{...{flex: 0.5}}}>
        <Text style={{...styles.fontstyle2, ...{textAlign: 'left'}}}>
          {item.title}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.MainContainer}>
      <MainHeaders
        title="Top Most Listened Tracks"
        navigation={props.navigation}
        onPress={() => PopScreen(props)}
        righticon="long-arrow-right"
        leftonPress={() => {}}
      />
      <View style={styles.top}>
        <View style={styles.analyticinfo}>
          <View style={{flex: 0.5}}>
            <Text style={styles.nrmlfnt}>
              <View style={styles.line} /> Today
            </Text>
          </View>
          <View style={{flex: 0.5}}>
            <Text style={styles.nrmlfnt}>
              <View style={styles.line} />
              Weekley
            </Text>
          </View>
          <View style={{flex: 0.5}}>
            <Text style={{...styles.nrmlfnt, ...{fontSize: 16}}}>
              Filter Top
            </Text>
          </View>
        </View>
        <View style={styles.analyticinfo}>
          <View style={{flex: 0.5}}>
            <Text style={styles.nrmlfnt}>
              <View style={styles.line} /> Yesterday
            </Text>
          </View>
          <View style={{flex: 0.5}}>
            <Text style={styles.nrmlfnt}>
              <View style={styles.line} />
              Monthly
            </Text>
          </View>
          <View
            style={{
              flex: 0.5,
            }}
          />
        </View>
        <Text style={styles.fontstyle3}>as of 25 May 2019, 09:41PM</Text>
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
      <View style={styles.contentstyle}>
        <FlatList
          data={data}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopMostListenedScreen);

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    marginTop: statusbarheight,
  },
  contentstyle: {
    flex: 1,
    padding: 20,
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
