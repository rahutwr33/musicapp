import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Button} from '../../components/button';
import KeyboardAvoid from '../../components/avoidkeyboards';
import {createPlaylist} from '../../globals/store/actions';
import {connect} from 'react-redux';
import {Alerts} from '../../utils/alert';
import {getplaylist} from '../../globals/store/actions/playlist';
import {PopScreen} from '../../navigation/pushscreen';
import {useTranslation} from 'react-i18next';

const CreatePlaylist = (props) => {
  const [playlist, setPlayList] = useState('');
  const {t, i18n} = useTranslation();

  const createnewPlaylist = async () => {
    if (!playlist) {
      Alerts('Please enter valid playlist name', '', '');
    } else if (playlist.length < 3) {
      Alerts('Playlist name should be atleast 3 character', '', '');
    } else {
      let results = await createPlaylist({playlist: playlist});
      if (results.success) {
        await props.getplaylist('');
        Alerts(results.message, 'playlist', props);
      } else {
        Alerts(results.message, '', '');
      }
    }
  };
  return (
    <KeyboardAvoid>
      <SafeAreaView style={styles.container}>
        <View style={styles.spacing}>
          <Text style={styles.fontstyle}>{t('Give_your_playlist_a_name')}</Text>
          <TextInput
            autoCorrect={false}
            autoCompleteType="off"
            autoFocus={true}
            onChangeText={(e) => setPlayList(e)}
            autoCapitalize="none"
            style={styles.inputstyle}
          />
        </View>
        <TouchableOpacity style={styles.spacing}>
          <Button
            buttonTitle={t('CREATE')}
            onPress={() => createnewPlaylist()}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.spacing}
          onPress={() => {
            PopScreen(props);
          }}>
          <Text style={styles.fontstyle2}>{t('Cancel')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoid>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

const mapDispatchToProps = {getplaylist};
export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist);
const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    color: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontstyle: {
    color: '#fff',
    fontSize: 21,
  },
  fontstyle2: {
    color: '#fff',
    fontSize: 16,
  },
  inputstyle: {
    marginTop: 50,
    fontSize: 16,
    fontWeight: '600',
    padding: 5,
    color: '#fff',
  },
  spacing: {
    marginTop: 30,
  },
});
