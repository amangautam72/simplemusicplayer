import React, { useEffect, useRef, useState } from 'react';
import { Text, Button, View, Image, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import TrackPlayer, {
  TrackPlayerEvents,
  STATE_PLAYING,
} from 'react-native-track-player';
import {
  useTrackPlayerProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player/lib/hooks';
import Slider from '@react-native-community/slider';
import styles from './styles';

const songDetails = {
  id: '1',
  url:
    'https://audio-previews.elements.envatousercontent.com/files/103682271/preview.mp3',
  title: 'Random Song',
  album: 'Great Album',
  artist: 'From Unknown Artist',
  artwork: 'https://picsum.photos/300',
};

const trackPlayerInit = async () => {
  await TrackPlayer.setupPlayer();
  TrackPlayer.updateOptions({
    stopWithApp: true,
    // capabilities: [
    //   TrackPlayer.CAPABILITY_PLAY,
    //   TrackPlayer.CAPABILITY_PAUSE,
    //   TrackPlayer.CAPABILITY_JUMP_FORWARD,
    //   TrackPlayer.CAPABILITY_JUMP_BACKWARD,
    // ],
  });
  await TrackPlayer.add({
    id: songDetails.id,
    url: songDetails.url,
    type: 'default',
    title: songDetails.title,
    album: songDetails.album,
    artist: songDetails.artist,
    artwork: songDetails.artwork,
  });
  return true;
};

const App = () => {
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState();
  const { position, duration } = useTrackPlayerProgress(250);

  useEffect(() => {
    const startPlayer = async () => {
      let isInit = await trackPlayerInit();
      setIsTrackPlayerInit(isInit);
    }
    startPlayer();
  }, []);

  //this hook updates the value of the slider whenever the current position of the song changes
  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue(position / duration);
    }
  }, [position, duration]);

  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], event => {
    if (event.state === STATE_PLAYING) {
      setIsPlaying(true);
      startTimer()
    } else {
      setIsPlaying(false);
      clearInterval(timer)
    }
  });

  const onButtonPressed = () => {
    if (!isPlaying) {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }
  };

  const startTimer = () => {
    const timer = setInterval(() => {
      setTime(prev => prev + 1)
    }, 1000)

    setTimer(timer)
    
  }

  const formatTime = (timeInSeconds) => {
    var minutes = Math.floor(timeInSeconds / 60);
    var seconds = timeInSeconds - minutes * 60;

    return `${minutes < 10 && "0"}${minutes}:${seconds < 10 ? "0" + parseInt(seconds) : parseInt(seconds)}`

  }

  const slidingStarted = () => {
    setIsSeeking(true);
  };

  const slidingCompleted = async value => {
    await TrackPlayer.seekTo(value * duration);
    setTime(value * duration)
    setSliderValue(value);
    setIsSeeking(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
       
          <Image
            source={require("./thumbnail.png")}
            resizeMode="contain"
            style={styles.albumImage}
          />
      
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.songTitle}>{songDetails.title}</Text>
        <Text style={styles.artist}>{songDetails.artist}</Text>
      </View>
      <View style={styles.controlsContainer}>



        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 40, paddingLeft: 60, paddingRight: 60 }}>

          <TouchableOpacity
          >
            <Image
              source={require("./previous.png")}
              resizeMode="contain"
              style={styles.next}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onButtonPressed}>
            <Image
              source={require("./playpause.png")}
              resizeMode="contain"
              style={styles.play}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={require("./next.png")}
              resizeMode="contain"
              style={styles.next}
            />
          </TouchableOpacity>


        </View>

        <Text style={{ alignSelf: "center" }}>{isPlaying ? 'Playing currently' : 'Paused'}</Text>
        <Text style={{ alignSelf: "center" }}>{formatTime(time)}</Text>


        <Slider
          style={styles.progressBar}
          minimumValue={0}
          maximumValue={1}
          value={sliderValue}
          minimumTrackTintColor="#111000"
          maximumTrackTintColor="#000000"
          onSlidingStart={slidingStarted}
          onSlidingComplete={slidingCompleted}
          thumbTintColor="#000"
        />

      </View>
    </View>
  );
};

export default App;
