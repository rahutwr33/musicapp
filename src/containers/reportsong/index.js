/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MainHeaders from '../../components/mainheader';
import {PopScreen} from '../../navigation/pushscreen';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {Textarea, Form} from 'native-base';
import {Button} from '../../components/button';
import {Alerts} from '../../utils/alert';
import {reportsonexplicit} from '../../globals/store/actions/song';

const ReportSong = (props) => {
  const {t, i18n} = useTranslation();
  const [message, setmessage] = useState('');
  const submit = async () => {
    const data = new FormData();
    data.append('song_id', props.state);
    data.append('message', message);
    const explicitresults = await reportsonexplicit(data);
    console.log('explicitresults', explicitresults);
    if (explicitresults.success) {
      Alerts(explicitresults.message, '', '');
      setmessage('');
    } else {
      Alerts(explicitresults.message, '', '');
    }
  };
  return (
    <View style={styles.MainContainer}>
      <MainHeaders
        title={t('Report_Song')}
        navigation={props.navigation}
        onPress={() => PopScreen(props)}
        righticon="long-arrow-right"
        leftonPress={() => {}}
      />
      <View style={styles.contentstyle}>
        <Form>
          <Textarea
            rowSpan={5}
            bordered
            style={{color: '#fff'}}
            placeholder="Enter Message"
            onChangeText={(e) => setmessage(e)}
            value={message}
          />
          <Button buttonTitle={t('Submit')} onPress={() => submit()} />
        </Form>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth.currentuser,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ReportSong);
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
