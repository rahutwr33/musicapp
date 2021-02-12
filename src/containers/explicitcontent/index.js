import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import MainHeaders from '../../components/mainheader';
import {PopScreen} from '../../navigation/pushscreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ControlledSwitch} from '../../components/animatedswitch';
import {updateprofile, updateCurrentUser} from '../../globals/store/actions';
import {Alerts} from '../../utils/alert';
import {
  getplaylist,
  userAllsong,
  userlikedsong,
  userAlbum,
} from '../../globals/store/actions/playlist';
import {
  getuserselectionsong,
  recentplayed,
  heavyrotation,
} from '../../globals/store/actions/song';
import {useTranslation} from 'react-i18next';

const ExplicitContentScreen = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {t, i18n} = useTranslation();
  useEffect(() => {
    if (
      props &&
      props.Auth &&
      props.Auth.user &&
      props.Auth.user.allow_explicity
    ) {
      setIsEnabled(props.Auth.user.allow_explicity);
    }
  }, [props]);
  const toggleSwitch = async () => {
    setIsEnabled((previousState) => !previousState);
    const data = new FormData();
    data.append('allow_explicity', !isEnabled);
    let response = await updateprofile(data);
    if (response && response.success) {
      let obj = {allow_explicity: !isEnabled};
      props.updateCurrentUser(obj);
      Alerts(response.message, '', '');
      await props.getplaylist('');
      await props.userlikedsong('');
      await props.userAllsong('');
      await props.userAlbum('');
      await props.getuserselectionsong();
      await props.heavyrotation();
      await props.recentplayed();
    } else {
      Alerts('Unexpected Server error', '', '');
    }
  };

  return (
    <View style={styles.MainContainer}>
      <MainHeaders
        title={t('Explicit_Content')}
        navigation={props.navigation}
        onPress={() => PopScreen(props)}
        righticon="long-arrow-right"
        leftonPress={() => {}}
      />
      <View style={styles.contentstyle}>
        <View style={styles.explicitalignstyle}>
          <ControlledSwitch
            trackColor={{false: '#f9f9f9', true: '#01BDBD'}}
            thumbColor="#fff"
            ios_backgroundColor="#fff"
            _onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={styles.explicitstyle}>
            {t('Allow_explicit_content')}
          </Text>
        </View>
        <View>
          <Text style={styles.fontstyle1}>
            Turn off to skip explicit content.
          </Text>
          <Text style={styles.fontstyle2}>
            Explicit content is labeled with the{' '}
            <Icon name="alpha-e-box" size={16} color="#8b8b8b" /> tag
          </Text>
        </View>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth.currentuser,
});

const mapDispatchToProps = {
  updateCurrentUser,
  getplaylist,
  userAllsong,
  userlikedsong,
  userAlbum,
  getuserselectionsong,
  recentplayed,
  heavyrotation,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExplicitContentScreen);

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  contentstyle: {
    margin: 15,
  },
  explicitalignstyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  explicitstyle: {
    color: '#fff',
    fontSize: 21,
  },
  fontstyle1: {
    color: '#929292',
    fontSize: 16,
    textAlign: 'left',
    paddingTop: 10,
    paddingLeft: 10,
  },
  fontstyle2: {
    color: '#929292',
    fontSize: 16,
    paddingTop: 10,
    paddingRight: 15,
    textAlign: 'left',
  },
});
