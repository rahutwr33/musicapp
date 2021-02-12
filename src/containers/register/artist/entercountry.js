/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Form, Container, Content} from 'native-base';
import {PushScreen} from '../../../navigation/pushscreen';
import {ARTIST_COMPANY_LABEL} from '../../../navigation/screen';
import {Button} from '../../../components/button';
import Headers from '../../../components/header';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getCountryList, setArtistValue} from '../../../globals/store/actions';
import {connect} from 'react-redux';
import KeyboardAvoid from '../../../components/avoidkeyboards';
import {Platform} from 'react-native';
import {Dimensions} from 'react-native';
import {PickerIOS} from '@react-native-community/picker';
import {Translation} from 'react-i18next';

const {width} = Dimensions.get('window');
class ArtistCountryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      selectcountry: '',
      id: '',
      country: [],
      status: '',
      message: '',
    };
  }

  componentDidMount = async () => {
    var countryList = await getCountryList();
    if (countryList && countryList.success) {
      this.setState(
        {
          country: countryList.data,
          id: this.props.user.country_id,
        },
        () => {
          this.state.country
            .filter((x) => x.id === this.state.id)
            .map((x) => {
              this.setState({
                selectcountry: x.country_name,
              });
            });
        },
      );
    } else {
      countryList = await getCountryList();
      this.setState(
        {
          country: countryList.data,
          id: this.props.user.country_id,
        },
        () => {
          this.setState({
            selectcountry: this.state.country[0].country_name,
            id: this.state.country[0].id,
            show: false,
            status: true,
            message: '',
          });
          this.state.country
            .filter((x) => x.id === this.state.id)
            .map((x) => {
              this.setState({
                selectcountry: x.country_name,
              });
            });
        },
      );
    }
  };

  openPicker = () => {
    if (this.state.show && this.state.country.length > 0) {
      return (
        <PickerIOS
          onStartShouldSetResponder={false}
          mode="dialog"
          style={{height: 50, width: width}}
          selectedValue={this.state.selectcountry}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({
              selectcountry: itemValue.country_name,
              id: itemValue.id,
              // show: false,
              status: true,
              message: '',
            });
          }}>
          <PickerIOS.Item color="#fff" label="Select Country" />
          {this.state.country.map((value) => {
            return (
              <PickerIOS.Item
                color="#fff"
                key={`country_${Date.now()}${value.id}`}
                value={value}
                label={value.country_name}
              />
            );
          })}
        </PickerIOS>
      );
    } else {
      return null;
    }
  };

  openAndroidPicker = () => {
    return (
      <Picker
        onStartShouldSetResponder={false}
        mode="dialog"
        style={{
          color: '#fff',
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
        }}
        itemStyle={{
          backgroundColor: '#fff',
          color: '#000',
          fontSize: 17,
        }}
        selectedValue={this.state.id}
        onValueChange={(itemValue, itemIndex) => {
          this.setState({
            selectcountry: itemValue,
            id: itemValue,
            show: false,
            status: true,
            message: '',
          });
        }}>
        <Picker.Item color="#fff" label="Select Country" />
        {this.state.country.map((value) => {
          return (
            <Picker.Item
              key={`country_${Date.now()}${value.id}`}
              value={value.id}
              color="#fff"
              label={value.country_name}
            />
          );
        })}
      </Picker>
    );
  };

  submit = async () => {
    if (this.state.id) {
      await this.props.setArtistValue({country_id: this.state.id});
      this.setState({status: true, message: '', show: false});
      PushScreen(ARTIST_COMPANY_LABEL, this.props);
    } else {
      this.setState({status: false, message: 'Please slect country'});
    }
  };

  render() {
    console.log(this.props);
    return (
      <KeyboardAvoid>
        <Translation>
          {(t) => (
            <Container style={styles.container}>
              <Headers title={t('Create_Account')} navigation={this.props} />
              <Content padder contentContainerStyle={styles.center}>
                <Form>
                  <View style={styles.padderBottom}>
                    <Text style={styles.labeltextStyle}>
                      {t('What’s_your_country?')}
                    </Text>
                  </View>
                  {Platform.OS === 'ios' ? (
                    <TouchableOpacity
                      style={styles.borderInput}
                      onPress={() => this.setState({show: true})}>
                      <Icon
                        style={styles.searchIcon}
                        name="chevron-down"
                        size={16}
                        color="#929292"
                      />
                      <Text style={styles.emailInput}>
                        {this.state.selectcountry
                          ? this.state.selectcountry
                          : t('Select_here')}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                  {Platform.OS === 'android' ? (
                    <View
                      style={{
                        marginTop: 20,
                        marginBottom: 20,
                        borderWidth: 1,
                        borderColor: '#fff',
                        height: 50,
                        borderBottomWidth: 1,
                      }}>
                      {this.openAndroidPicker()}
                    </View>
                  ) : null}

                  {!this.state.status ? (
                    <View style={styles.padderTop}>
                      <Text
                        adjustsFontSizeToFit={true}
                        style={[
                          styles.fontStyle,
                          {color: this.state.status ? '#01BDBD' : '#ed4377'},
                        ]}>
                        {this.state.message}
                      </Text>
                    </View>
                  ) : null}
                  <Button onPress={() => this.submit()} buttonTitle="Next" />
                  {Platform.OS === 'ios' ? (
                    <View style={{marginTop: 10}}>{this.openPicker()}</View>
                  ) : null}
                </Form>
              </Content>
            </Container>
          )}
        </Translation>
      </KeyboardAvoid>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.Auth.registerartist,
});

const mapDispatchToProps = {getCountryList, setArtistValue};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtistCountryScreen);
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
    borderWidth: 1,
    flexDirection: 'row-reverse',
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
  },
  emailInput: {
    color: '#fff',
    textAlign: 'left',
    padding: 15,
  },
  searchIcon: {
    paddingLeft: 15,
    padding: 15,
    // top:2
  },
});
