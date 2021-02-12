import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import MainHeaders from '../../components/mainheader';
import {PopScreen} from '../../navigation/pushscreen';
import {statusbarheight} from '../../utils/statusbarheight';
import Device from '../../assets/svg/devices.svg';
import Tablet from '../../assets/svg/tablet.svg';
import Desktop from '../../assets/svg/desktop.svg';
import Mobile from '../../assets/svg/mobile.svg';
import Player from '../../components/miniplayer';
import {devicelist} from '../../globals/store/actions/auth';
import {Content} from 'native-base';
import {useTranslation} from 'react-i18next';

const data = [
  {
    title: 'This Phone',
    phone: 'Iphone5s',
    type: 'mobile',
  },
  {
    title: 'Desktop',
    phone: 'Desktop ABCD:123',
    type: 'Desktop',
  },
  {
    title: 'Tablet',
    phone: 'Tablet A31F3',
    type: 'Tablet',
  },
];

const width = Dimensions.get('window').width;
const DevicesScreen = (props) => {
  const [list, setstate] = useState([]);
  const [loader, setloader] = useState(false);
  const {t, i18n} = useTranslation();

  const getHistory = async () => {
    const result = await devicelist();
    if (result && result.success) {
      setloader(false);
      setstate(result.data.active_device);
    }
  };
  useEffect(() => {
    setloader(true);
    getHistory();
  }, []);
  const renderItem = ({item}) => (
    <TouchableOpacity
      key={`devices${String(item.id)}${Date.now()}`}
      onPress={() => {}}
      style={styles.liststyle2}>
      {item.device_type === 'mobile' ? <Mobile width="50" height="50" /> : null}
      {item.device_type === 'Desktop' || item.device_type === 'laptop' ? (
        <Desktop width="60" height="60" />
      ) : null}
      {item.device_type === 'Tablet' ? <Tablet width="50" height="50" /> : null}
      <View>
        <Text style={styles.fontstyle3}>{item.device_type}</Text>
        <Text style={styles.fontstyle2}>{item.device_name}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.MainContainer}>
      <MainHeaders
        title={t('Devices')}
        navigation={props.navigation}
        onPress={() => PopScreen(props)}
        righticon="long-arrow-right"
        leftonPress={() => {}}
      />
      <Content>
        <View style={styles.deviceiconstyle}>
          <Device width="100%" height="100%" />
          <Text style={styles.fontstyle1}>
            {t('Connected')} {t('Devices')}
          </Text>
        </View>
        <View style={styles.liststyle}>
          {loader ? (
            <View style={{...{alignSelf: 'center', marginTop: 20}}}>
              <ActivityIndicator size="large" />
            </View>
          ) : null}
          <FlatList
            data={list}
            renderItem={(item) => renderItem(item)}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Content>
      <Player />
    </View>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

const mapDispatchToProps = {devicelist};
export default connect(mapStateToProps, mapDispatchToProps)(DevicesScreen);

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    marginTop: statusbarheight,
  },
  contentstyle: {
    flex: 1,
  },
  fontstyle1: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 10,
    fontWeight: '700',
  },
  fontstyle2: {
    color: '#929292',
    fontSize: 12,
    paddingTop: 10,
    textAlign: 'left',
  },
  fontstyle3: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'left',
    paddingTop: 10,
    fontWeight: '700',
  },
  deviceiconstyle: {
    alignSelf: 'center',
    width: width,
    height: 150,
  },
  liststyle: {
    flex: 1,
    margin: 10,
    marginTop: 30,
    // alignItems: 'flex-end',
  },
  liststyle2: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'flex-start',
  },
});
