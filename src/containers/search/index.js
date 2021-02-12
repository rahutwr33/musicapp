/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {Form, Container, Content, Item} from 'native-base';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  SEARCH_BAR,
  POP_SCREEN,
  CONCERT_SEARCH_SCREEN,
  CHART_DETAIL,
} from '../../navigation/screen';
import Player from '../../components/miniplayer';
// import {showsearchbar} from '../../components/searchoverlay';
import {PushPropsScreen} from '../../navigation/pushscreen';
import {Genere} from '../../utils/data/search';
import {StatusBar} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {useTranslation} from 'react-i18next';
const {width, height} = Dimensions.get('window');

const SearchScreen = (props) => {
  const {t, i18n} = useTranslation();
  useEffect(() => {
    Navigation.events().registerBottomTabSelectedListener((tab) => {
      if (tab && tab.selectedTabIndex === 2) {
        Navigation.popToRoot(props.componentId);
      }
    });
  }, [Navigation]);
  const switchscreen = (screen) => {
    switch (screen) {
      case 'Concerts':
        PushPropsScreen(CONCERT_SEARCH_SCREEN, props, true, {
          placeholder: t('Search_by_city'),
        });
        break;
      case 'POP':
        PushPropsScreen(POP_SCREEN, props, true, screen);
        break;
      case 'ROCK':
        PushPropsScreen(POP_SCREEN, props, true, screen);
        break;
      case 'New_Releases':
        PushPropsScreen(SEARCH_BAR, props, true, {
          placeholder: t('find_songs'),
        });
        // showsearchbar({
        //   Screen: SEARCH_BAR,
        //   placeholder: 'Find songs',
        // });
        break;
      case 'Middle_Easterns':
        PushPropsScreen(POP_SCREEN, props, true, screen);
        break;
      case 'Jazz':
        PushPropsScreen(POP_SCREEN, props, true, screen);
        break;
      case 'R&B':
        PushPropsScreen(POP_SCREEN, props, true, screen);
        break;
      case 'Charts':
        PushPropsScreen(CHART_DETAIL, props, true, screen);
        break;
      default:
        break;
    }
  };
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      key={`_search_${index + 1}`}
      style={[styles.cardstyle, {backgroundColor: item.color}]}
      onPress={() => switchscreen(item.title)}>
      <Text adjustsFontSizeToFit={true} style={styles.genrestyle}>
        {t(item.title)}
      </Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.safeview}>
      <StatusBar backgroundColor="#262626" barStyle="dark-content" />
      <Container style={styles.container}>
        <Content padder contentContainerStyle={styles.center}>
          <Form>
            <Item
              regular
              style={styles.borderInput}
              onPress={
                () =>
                  PushPropsScreen(SEARCH_BAR, props, true, {
                    placeholder: t('find_songs'),
                  })
                // showsearchbar({
                //   Screen: SEARCH_BAR,
                //   placeholder: 'Find songs',
                // })
              }>
              <Icon
                style={styles.searchIcon}
                name="search"
                size={16}
                color="#929292"
              />
              <Text style={styles.fontStyle}>
                {t('Search')},{t('songs')}
              </Text>
            </Item>
          </Form>
          <View style={styles.title}>
            <Text style={styles.fonttitle}>{t('Your_Top_Genres')}</Text>
          </View>
          <FlatList
            columnWrapperStyle={styles.flatlistcolumnstyle}
            contentContainerStyle={styles.flatliststyle}
            data={Genere}
            numColumns={2}
            renderItem={(item) => renderItem(item)}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </Content>
        <Player />
      </Container>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
  },
  container: {
    backgroundColor: '#262626',
  },
  genrestyle: {
    color: '#fff',
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 24,
  },
  center: {
    justifyContent: 'center',
    paddingTop: height / 12,
    paddingLeft: 20,
    paddingRight: 20,
  },
  searchIcon: {
    paddingLeft: 15,
    padding: 15,
    textAlign: 'left',
  },
  form: {
    width: '100%',
  },
  borderInput: {
    borderColor: '#ffffff',
    textAlign: 'left',
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
  emailInput: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 16,
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
  },
  fonttitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'left',
    fontWeight: '900',
  },
  musiccard: {
    paddingTop: 10,
  },
  cardstyle: {
    width: width / 2.5,
    height: 100,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  flatlistcolumnstyle: {
    justifyContent: 'space-between',
  },
  flatliststyle: {
    height: height > 800 ? height / 1.6 : height / 1.2,
  },
});
