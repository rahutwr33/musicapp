/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Form, Item, Input, Container, Content} from 'native-base';
import {PushScreen} from '../../../navigation/pushscreen';
import {ARTIST_WEBSITER_SCREEN} from '../../../navigation/screen';
import {Button} from '../../../components/button';
import Headers from '../../../components/header';
import {setArtistValue} from '../../../globals/store/actions';
import {connect} from 'react-redux';
import KeyboardAvoid from '../../../components/avoidkeyboards';
import {useTranslation} from 'react-i18next';

const ArtistCompanyLabelScreen = (props) => {
  const [company, setCompany] = useState(props.user.company_label);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const {t, i18n} = useTranslation();

  const submit = async () => {
    if (company) {
      await props.setArtistValue({company_label: company});
      setMessage('');
      setStatus(true);
      PushScreen(ARTIST_WEBSITER_SCREEN, props);
    } else {
      setMessage('Incorrect label company name');
      setStatus(false);
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
                {t('Your_Label_Company')}
              </Text>
            </View>
            <Item regular style={styles.borderInput}>
              <Input
                placeholderTextColor="#ffffff"
                style={styles.emailInput}
                onChangeText={(e) => setCompany(e)}
                value={company}
                autoCorrect={false}
                autoCompleteType="off"
              />
            </Item>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtistCompanyLabelScreen);
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
  padderBottom: {
    paddingBottom: 5,
  },
  form: {
    width: '100%',
  },
  borderInput: {
    borderColor: '#ffffff',
  },
  labeltextStyle: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'left',
  },
  fontStyle: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 16,
  },
  emailInput: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '700',
  },
});
