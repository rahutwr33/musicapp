import React, {createContext, useState, useEffect} from 'react';
const defaultMode = false;

export const PlayerStateContext = createContext({
  musicstate: false,
  setplayerState: (musicstate) => console.log(musicstate),
});

const ManageMusicStateProvider = ({children}) => {
  const [musicstate, setMusicState] = useState(defaultMode);
  useEffect(() => {
    setMusicState(musicstate);
  }, [musicstate]);
  const setplayerState = (value) => {
    setMusicState(value);
  };
  return (
    <PlayerStateContext.Provider
      value={{musicstate: musicstate, setplayerState}}>
      {children}
    </PlayerStateContext.Provider>
  );
};

const MusicStateManager = ({children}) => (
  <ManageMusicStateProvider>{children}</ManageMusicStateProvider>
);

export const usePlayer = () => React.useContext(PlayerStateContext);
export default MusicStateManager;
