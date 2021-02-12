/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {Form, Container, Content} from 'native-base';
import {Button} from '../../../components/button';
import Headers from '../../../components/header';
import {connect} from 'react-redux';
import {setArtistValue} from '../../../globals/store/actions';
import KeyboardAvoid from '../../../components/avoidkeyboards';
import DateTimePicker from '@react-native-community/datetimepicker';
import {PushScreen} from '../../../navigation/pushscreen';
import {ARTIST_GENDER_SCREEN} from '../../../navigation/screen';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

const ArtistDOBScreen = (props) => {
  let [year, setYear] = useState('');
  let [day, setDay] = useState('');
  let [month, setMonth] = useState();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const {t, i18n} = useTranslation();
  useEffect(() => {
    setYear(props.user.date_of_birth.split('-')[0]);
    setDay(props.user.date_of_birth.split('-')[1]);
    setMonth(props.user.date_of_birth.split('-')[2]);
  }, []);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let year = new Date(currentDate).getFullYear();
    let month = new Date(currentDate).getMonth() + 1;
    let day = new Date(currentDate).getDate();
    setYear(year);
    setDay(day);
    setMonth(month);
  };

  const submit = async () => {
    if (year && day && month) {
      if (String(day).length === 1) {
        day = `0${day}`;
      }
      if (String(month).length === 1) {
        month = `0${month}`;
      }
      let utc = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD', true);
      let isUTC = utc.isValid();
      if (isUTC) {
        await props.setArtistValue({date_of_birth: `${year}-${month}-${day}`});
        setMessage('');
        setStatus(true);
        PushScreen(ARTIST_GENDER_SCREEN, props);
      } else {
        setMessage('Invalid Date');
        setStatus(false);
      }
    } else {
      PushScreen(ARTIST_GENDER_SCREEN, props);
      // setMessage('Incorrect DOB');
      // setStatus(false);
    }
  };
  return (
    <KeyboardAvoid>
      <Container style={styles.container}>
        <Headers title={t('Create_Account')} navigation={props} />
        <Content
          scrollEnabled={false}
          padder
          contentContainerStyle={styles.center}>
          <Form>
            <View style={styles.padderBottom}>
              <Text style={styles.labeltextStyle}>
                {t('What’s_your_date_of_birth?')} {`(${t('Optional')})`}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.dobstyle}
              onPress={() => setShow(true)}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  marginTop: 15,
                  marginLeft: 10,
                  fontWeight: '700',
                }}>
                {year && day && month
                  ? `${year}-${month}-${day}`
                  : t('Enter_dob')}
              </Text>
              {/* <TextInput
                keyboardType="numeric"
                placeholderTextColor="#ffffff"
                placeholder="Month"
                style={styles.dobmonthInput}
                onChangeText={(e) => setMonth(e)}
                value={month}
                autoCorrect={false}
                autoCompleteType="off"
              />
              <TextInput
                keyboardType="numeric"
                placeholderTextColor="#ffffff"
                placeholder="Day"
                style={styles.dobdayInput}
                onChangeText={(e) => setDay(e)}
                value={day}
                autoCorrect={false}
                autoCompleteType="off"
              />
              <TextInput
                keyboardType="numeric"
                placeholderTextColor="#ffffff"
                placeholder="Year"
                style={styles.dobyearInput}
                onChangeText={(e) => setYear(e)}
                value={year}
                autoCorrect={false}
                autoCompleteType="off"
              /> */}
            </TouchableOpacity>
            <View style={styles.padderTop}>
              <Text
                adjustsFontSizeToFit={true}
                style={[
                  styles.fontStyle,
                  {color: status ? '#01BDBD' : '#ed4377'},
                ]}>
                {message}
              </Text>
            </View>
            {show ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                textColor="#fff"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            ) : null}
            <Button onPress={() => submit()} buttonTitle={t('Next')} />
          </Form>
        </Content>
      </Container>
    </KeyboardAvoid>
  );
};
const mapStateToProps = (state) => ({
  user: state.Auth.registerartist,
});

const mapDispatchToProps = {setArtistValue};
export default connect(mapStateToProps, mapDispatchToProps)(ArtistDOBScreen);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262626',
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  center: {
    justifyContent: 'center',
    flex: 1,
  },
  padderTop: {
    paddingTop: 5,
  },
  dobstyle: {
    flexDirection: 'row',
    borderColor: '#fff',
    borderWidth: 1,
    height: 50,
  },
  padderBottom: {
    paddingBottom: 5,
  },
  form: {
    width: '100%',
  },
  borderInput: {
    borderColor: '#ffffff',
    marginRight: 10,
  },
  labeltextStyle: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 21,
    textAlign: 'left',
  },
  fontStyle: {
    color: '#ffffff',
    textAlign: 'left',
  },
  dobyearInput: {
    width: 100,
    height: 40,
    borderColor: '#ffffff',
    color: '#fff',
    borderWidth: 1,
    textAlign: 'center',
    marginLeft: 20,
  },
  dobdayInput: {
    width: 100,
    height: 40,
    borderColor: '#ffffff',
    color: '#fff',
    borderWidth: 1,
    textAlign: 'center',
    marginLeft: 20,
  },
  dobmonthInput: {
    width: 100,
    height: 40,
    borderColor: '#ffffff',
    color: '#fff',
    borderWidth: 1,
    textAlign: 'center',
    position: 'relative',
  },
});
