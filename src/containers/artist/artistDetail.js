/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Album} from '../../components/scrollableheader/Album';
import {connect} from 'react-redux';
import {currentplaylist, currentsong} from '../../globals/store/actions/player';
import {artistdetail} from '../../globals/store/actions/auth';
import api from '../../config/api';
import {View, ActivityIndicator} from 'react-native';
import {statusbarheight} from '../../utils/statusbarheight';

const ArtistDetailScreen = (props) => {
  console.log('props', props);
  const [album, setstate] = useState({});
  const [loader, setloader] = useState(false);
  async function loaduser() {
    setloader(true);
    const results = await artistdetail({id: props.state});
    if (results && results.status) {
      setstate({
        id: results.data.id,
        artist: results.data.artist_name,
        release: 2016,
        cover: api.imageurl + results.data.image,
        tracks: results.artist_songs,
      });
      setloader(false);
    }
    return results;
  }
  useEffect(() => {
    loaduser();
  }, []);
  return (
    <>
      {loader ? (
        <View
          style={{
            ...{
              alignSelf: 'center',
              marginTop: statusbarheight,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <Album {...{album}} props={props} />
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
  Player: state.Player,
});

const mapDispatchToProps = {currentplaylist, currentsong};
export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetailScreen);
