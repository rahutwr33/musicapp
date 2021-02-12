import React from 'react';
import {Navigation} from 'react-native-navigation';
import {
  SPLASH_SCREEN,
  LOGIN_SCREEN,
  SIDEBAR_SCREEN,
  EMAIL_SCREEN,
  PASSWORD_SCREEN,
  NAME_SCREEN,
  DOB_SCREEN,
  GENDER_SCREEN,
  REPORT_SCREEN,
  ADD_SONG_PLAYLIST,
  DEVICES_SCREEN,
  SELECT_ARTIST,
  CHART_DETAIL,
  ARTIST_EMAIL_SCREEN,
  ARTIST_PASSWORD_SCREEN,
  ARTIST_NAME_SCREEN,
  ARTIST_DOB_SCREEN,
  MINI_PLAYER,
  ARTIST_GENDER_SCREEN,
  ARTIST_SELECT_GENRE_SCREEN,
  ARTIST_USERNAME,
  ARTIST_COUNTRY,
  CONCERT_SEARCH_SCREEN,
  ARTIST_COMPANY_LABEL,
  ARTIST_WEBSITER_SCREEN,
  ARTIST_SOCIAL_MEDIA_SCREEN,
  LOGIN_OPTION_SCREEN,
  MAIN_LOGIN_SCREEN,
  FORGOT_PASSWORD_SCREEN,
  SELECT_ARTIST_OF_ARTIST,
  REGISTER_OPTION_SCREEN,
  MAIN_SCREEN,
  USERNAME_SCREEN,
  PROFILE_SCREEN,
  DOWNLOAD_SCREEN,
  EDIT_PROFILE,
  ADD_SONG_TO_ALBUM,
  EXPLICIT_SCREEN,
  SEARCH_SCREEN,
  SEARCH_BAR,
  VERIFY_TOKEN,
  ARTIST_SHOW_SOCIAL_MEDIA_SCREEN,
  FULL_SCREEN_PLAYER,
  CONCERT_SCREEN,
  Library_PLAYLIST_SCREEN,
  CREATE_PLAYLIST,
  LIKED_SONG_SCREEN,
  POP_SCREEN,
  PLAYLIST_ACTION_MODEL,
  SHARE_SCREEN,
  HIDDEN_ARTIST_SCREEN,
  HIDDEN_MAIN_SCREEN,
  HIDDEN_SONG_SCREEN,
  SONGS_CREDIT_SCREEN,
  CHART_SCREEN,
  ARTIST_DETAIL_SCREEN,
  PLAYLIST_SEARCH_SCREEN,
  NOTIFICATIONS_SCREEN,
  SEARCH_LOCATION_FOCUSED,
  BUFFER_SCREEN,
  GLOBAL_SEARCHBAR_SCREEN,
  UPLOAD_SCREEN,
  ABOUT_US,
  TOPMOSTLISTENER,
  ALBUM,
  HISTORY_SCREEN,
  ANALYTICS_SCREEN,
} from './screen';
import Splash from '../containers/splash/splash';
import LoginScreen from '../containers/login/front';
import {
  EmailScreen,
  DOBScreen,
  GenderScreen,
  PasswordScreen,
  NameScreen,
  SelectArtist,
  UserNameScreen,
} from '../containers/register/user';

import {
  ArtistEmailScreen,
  ArtistCountryScreen,
  ArtistUserNameScreen,
  ArtistDOBScreen,
  ArtistGenderScreen,
  ArtistPasswordScreen,
  ArtistNameScreen,
  ArtistCompanyLabelScreen,
  ArtistWebsiteScreen,
  ArtistSocialMediaScreen,
  ArtistSelectGenre,
  SelectArtistOFArtist,
  ArtistShowSocialMediaScree,
} from '../containers/register/artist';

import SidebarScreen from '../containers/sidebar';
import {Provider} from 'react-redux';
import store from '../globals/store';
import i18n from '../translation/i18n';
import LoginOptionScreen from '../containers/login/loginoption';
import MainLoginScreen from '../containers/login/mainlogin';
import ForgotPasswordScreen from '../containers/forgotpassword';
import RegisterOptionScreen from '../containers/register/registeroption';
import MainScreen from '../containers/main';
import ProfileScreen from '../containers/profile';
import EditprofileScreen from '../containers/editprofile';
import ExplicitContentScreen from '../containers/explicitcontent';
import SearchScreen from '../containers/search';
import SearchBarScreen from '../components/searchbar';
import PlayerScreen from '../components/player';

import {
  LibraryPlaylist,
  CreatePlaylist,
  LikedSong,
  PlaylistAction,
  ShareScreen,
  PlayListSearchScreen,
  SearchLocationFocused,
} from '../containers/playlist';
import {
  ConcertScreen,
  ChartDetailScreen,
  PopMusicScreen,
} from '../containers/search/searchDetails';
import {
  HiddenSongsScreen,
  HidenArtistScreen,
  HiddenMainScreen,
} from '../containers/hiddensongs';
import {SongsCredit} from '../containers/songscredit';
import ArtistDetailScreen from '../containers/artist/artistDetail';
import {Album} from '../components/scrollableheader/Album';
import BufferScreen from '../containers/buffer';
import GlobalSearchBarScreen from '../components/globalsearchbar';
import UploadScreen from '../containers/upload/index';
import ConcertSearchBarScreen from '../components/concertsearch';
import DevicesScreen from '../containers/devices/index';
import NotificationScreen from '../containers/notification/index';
import HistoryScreen from '../containers/history/index';
import AnalyticsScreen from '../containers/analytics';
import TopMostListenedScreen from '../containers/analytics/topmostlistner';
import ChartScreen from '../containers/analytics/chart';
import AddToPlaylist from '../components/addtoplaylist';
import AddSongToAlbum from '../components/addsongtoalbum';
import Player from '../components/miniplayer';
import Aboutus from '../containers/aboutus/index';
import DownloadScreen from '../containers/download/index';
import Pushnotification from '../utils/pushnotification';
import {StatusBar} from 'react-native';
import {Root} from 'native-base';
import VerifyOtpScreen from '../containers/forgotpassword/verifyotp';
import ReportSong from '../containers/reportsong/index';

function WrappedComponent(Component) {
  return function inject(props) {
    const EnhancedComponent = () => (
      <Provider store={store}>
        <StatusBar backgroundColor="#262626" barStyle="dark-content" />
        <Pushnotification />
        <Root>
          <Component {...props} screenprops={i18n} />
        </Root>
      </Provider>
    );

    return <EnhancedComponent />;
  };
}

export default async function () {
  Navigation.registerComponent(SPLASH_SCREEN, () => WrappedComponent(Splash));
  Navigation.registerComponent(LOGIN_SCREEN, () =>
    WrappedComponent(LoginScreen),
  );
  Navigation.registerComponent(LOGIN_OPTION_SCREEN, () =>
    WrappedComponent(LoginOptionScreen),
  );
  Navigation.registerComponent(MAIN_LOGIN_SCREEN, () =>
    WrappedComponent(MainLoginScreen),
  );
  Navigation.registerComponent(FORGOT_PASSWORD_SCREEN, () =>
    WrappedComponent(ForgotPasswordScreen),
  );
  Navigation.registerComponent(REGISTER_OPTION_SCREEN, () =>
    WrappedComponent(RegisterOptionScreen),
  );
  Navigation.registerComponent(SELECT_ARTIST_OF_ARTIST, () =>
    WrappedComponent(SelectArtistOFArtist),
  );
  Navigation.registerComponent(EMAIL_SCREEN, () =>
    WrappedComponent(EmailScreen),
  );
  Navigation.registerComponent(DOB_SCREEN, () => WrappedComponent(DOBScreen));
  Navigation.registerComponent(GENDER_SCREEN, () =>
    WrappedComponent(GenderScreen),
  );
  Navigation.registerComponent(PASSWORD_SCREEN, () =>
    WrappedComponent(PasswordScreen),
  );
  Navigation.registerComponent(NAME_SCREEN, () => WrappedComponent(NameScreen));
  Navigation.registerComponent(SELECT_ARTIST, () =>
    WrappedComponent(SelectArtist),
  );

  Navigation.registerComponent(ARTIST_EMAIL_SCREEN, () =>
    WrappedComponent(ArtistEmailScreen),
  );
  Navigation.registerComponent(ARTIST_DOB_SCREEN, () =>
    WrappedComponent(ArtistDOBScreen),
  );
  Navigation.registerComponent(ARTIST_GENDER_SCREEN, () =>
    WrappedComponent(ArtistGenderScreen),
  );
  Navigation.registerComponent(ARTIST_PASSWORD_SCREEN, () =>
    WrappedComponent(ArtistPasswordScreen),
  );
  Navigation.registerComponent(ARTIST_NAME_SCREEN, () =>
    WrappedComponent(ArtistNameScreen),
  );
  Navigation.registerComponent(ARTIST_SELECT_GENRE_SCREEN, () =>
    WrappedComponent(ArtistSelectGenre),
  );
  Navigation.registerComponent(ARTIST_USERNAME, () =>
    WrappedComponent(ArtistUserNameScreen),
  );
  Navigation.registerComponent(ARTIST_COUNTRY, () =>
    WrappedComponent(ArtistCountryScreen),
  );
  Navigation.registerComponent(ARTIST_COMPANY_LABEL, () =>
    WrappedComponent(ArtistCompanyLabelScreen),
  );
  Navigation.registerComponent(ARTIST_WEBSITER_SCREEN, () =>
    WrappedComponent(ArtistWebsiteScreen),
  );
  Navigation.registerComponent(ARTIST_SOCIAL_MEDIA_SCREEN, () =>
    WrappedComponent(ArtistSocialMediaScreen),
  );
  Navigation.registerComponent(MAIN_SCREEN, () => WrappedComponent(MainScreen));

  Navigation.registerComponent(SIDEBAR_SCREEN, () =>
    WrappedComponent(SidebarScreen),
  );
  Navigation.registerComponent(USERNAME_SCREEN, () =>
    WrappedComponent(UserNameScreen),
  );
  Navigation.registerComponent(PROFILE_SCREEN, () =>
    WrappedComponent(ProfileScreen),
  );
  Navigation.registerComponent(EDIT_PROFILE, () =>
    WrappedComponent(EditprofileScreen),
  );
  Navigation.registerComponent(EXPLICIT_SCREEN, () =>
    WrappedComponent(ExplicitContentScreen),
  );
  Navigation.registerComponent(SEARCH_SCREEN, () =>
    WrappedComponent(SearchScreen),
  );
  Navigation.registerComponent(UPLOAD_SCREEN, () =>
    WrappedComponent(UploadScreen),
  );
  Navigation.registerComponent(SEARCH_BAR, () =>
    WrappedComponent(SearchBarScreen),
  );
  Navigation.registerComponent(ARTIST_SHOW_SOCIAL_MEDIA_SCREEN, () =>
    WrappedComponent(ArtistShowSocialMediaScree),
  );
  Navigation.registerComponent(FULL_SCREEN_PLAYER, () =>
    WrappedComponent(PlayerScreen),
  );
  Navigation.registerComponent(CONCERT_SCREEN, () =>
    WrappedComponent(ConcertScreen),
  );
  Navigation.registerComponent(Library_PLAYLIST_SCREEN, () =>
    WrappedComponent(LibraryPlaylist),
  );
  Navigation.registerComponent(CREATE_PLAYLIST, () =>
    WrappedComponent(CreatePlaylist),
  );
  Navigation.registerComponent(LIKED_SONG_SCREEN, () =>
    WrappedComponent(LikedSong),
  );
  Navigation.registerComponent(POP_SCREEN, () =>
    WrappedComponent(PopMusicScreen),
  );
  Navigation.registerComponent(PLAYLIST_ACTION_MODEL, () =>
    WrappedComponent(PlaylistAction),
  );
  Navigation.registerComponent(SHARE_SCREEN, () =>
    WrappedComponent(ShareScreen),
  );
  Navigation.registerComponent(HIDDEN_MAIN_SCREEN, () =>
    WrappedComponent(HiddenMainScreen),
  );
  Navigation.registerComponent(HIDDEN_SONG_SCREEN, () =>
    WrappedComponent(HiddenSongsScreen),
  );
  Navigation.registerComponent(HIDDEN_ARTIST_SCREEN, () =>
    WrappedComponent(HidenArtistScreen),
  );
  Navigation.registerComponent(SONGS_CREDIT_SCREEN, () =>
    WrappedComponent(SongsCredit),
  );
  Navigation.registerComponent(ARTIST_DETAIL_SCREEN, () =>
    WrappedComponent(ArtistDetailScreen),
  );
  Navigation.registerComponent(ALBUM, () => WrappedComponent(Album));
  Navigation.registerComponent(PLAYLIST_SEARCH_SCREEN, () =>
    WrappedComponent(PlayListSearchScreen),
  );
  Navigation.registerComponent(SEARCH_LOCATION_FOCUSED, () =>
    WrappedComponent(SearchLocationFocused),
  );
  Navigation.registerComponent(BUFFER_SCREEN, () =>
    WrappedComponent(BufferScreen),
  );
  Navigation.registerComponent(GLOBAL_SEARCHBAR_SCREEN, () =>
    WrappedComponent(GlobalSearchBarScreen),
  );
  Navigation.registerComponent(CONCERT_SEARCH_SCREEN, () =>
    WrappedComponent(ConcertSearchBarScreen),
  );
  Navigation.registerComponent(DEVICES_SCREEN, () =>
    WrappedComponent(DevicesScreen),
  );
  Navigation.registerComponent(NOTIFICATIONS_SCREEN, () =>
    WrappedComponent(NotificationScreen),
  );
  Navigation.registerComponent(HISTORY_SCREEN, () =>
    WrappedComponent(HistoryScreen),
  );
  Navigation.registerComponent(ANALYTICS_SCREEN, () =>
    WrappedComponent(AnalyticsScreen),
  );
  Navigation.registerComponent(TOPMOSTLISTENER, () =>
    WrappedComponent(TopMostListenedScreen),
  );
  Navigation.registerComponent(CHART_SCREEN, () =>
    WrappedComponent(ChartScreen),
  );
  Navigation.registerComponent(ADD_SONG_PLAYLIST, () =>
    WrappedComponent(AddToPlaylist),
  );
  Navigation.registerComponent(CHART_DETAIL, () =>
    WrappedComponent(ChartDetailScreen),
  );
  Navigation.registerComponent(ADD_SONG_TO_ALBUM, () =>
    WrappedComponent(AddSongToAlbum),
  );
  Navigation.registerComponent(MINI_PLAYER, () => WrappedComponent(Player));
  Navigation.registerComponent(ABOUT_US, () => WrappedComponent(Aboutus));
  Navigation.registerComponent(DOWNLOAD_SCREEN, () =>
    WrappedComponent(DownloadScreen),
  );
  Navigation.registerComponent(VERIFY_TOKEN, () =>
    WrappedComponent(VerifyOtpScreen),
  );
  Navigation.registerComponent(REPORT_SCREEN, () =>
    WrappedComponent(ReportSong),
  );

  console.info('All screens have been registered...');
}
