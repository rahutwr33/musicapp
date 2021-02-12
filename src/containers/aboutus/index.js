/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {statusbarheight} from '../../utils/statusbarheight';
import MainHeaders from '../../components/mainheader';
import {PopScreen} from '../../navigation/pushscreen';
import {aboutus} from '../../globals/store/actions';
import {Translation} from 'react-i18next';

export default class Aboutus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutus: '',
    };
  }

  async componentDidMount() {
    const results = await aboutus();
    if (results && results.success) {
      this.setState({aboutus: results.data.about});
    }
    console.log('results', results);
  }
  render() {
    return (
      <View style={styles.container}>
        <Translation>
          {(t, {i18n}) => (
            <>
              <MainHeaders
                title={t('Aboutus')}
                navigation={this.props.navigation}
                onPress={() => PopScreen(this.props)}
                righticon="long-arrow-right"
                leftonPress={() => {}}
              />
              <View style={styles.content}>
                <Text adjustsFontSizeToFit={true} style={styles.contentstyle}>
                  {this.state.aboutus}
                </Text>
                {/* <WebView
            originWhitelist={['*']}
            source={{html: `${this.state.aboutus}`}}
          /> */}
              </View>
            </>
          )}
        </Translation>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: statusbarheight,
  },
  content: {
    flex: 1,
    margin: 5,
  },
  contentstyle: {
    textAlign: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    color: '#fff',
  },
});
