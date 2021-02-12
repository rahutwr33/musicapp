import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => {
    console.log(111111);
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    console.log(111111);
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener('remote-next', () => {
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener('remote-previous', () => {
    TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.destroy();
  });
  console.log('service registed');
};
