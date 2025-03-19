import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Animated,
  Easing,
  Pressable,
} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import Wrapper from '../components/Wrapper';
import {deviceHeight, deviceWidth} from '../constants/Scaling';
import Logo from '../assets/images/logo.png';
import GradientButton from '../components/GradientButton';
import LottieView from 'lottie-react-native';
import Witch from '../assets/animation/witch.json';
import { playSound } from '../helpers/SoundUtility';
import { useIsFocused } from '@react-navigation/native';
import SoundPlayer from 'react-native-sound-player';
import { navigate } from '../helpers/NavigationUtil';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPositions } from '../redux/reducers/gameSelector';
import { resetGame } from '../redux/reducers/gameSlice';

const showStyledAlert = (title, message) => {
  Alert.alert(
    title,
    message,
    [{ text: 'OK', style: 'destructive' }],
    { cancelable: true }
  );
};

const HomeScreen = () => {
  const dispatch = useDispatch(); 
  const currentPositions = useSelector(selectCurrentPositions);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const witchAnim = useRef(new Animated.Value(-deviceWidth)).current;
  const scaleXAnim = useRef(new Animated.Value(-1)).current;
  const isFocused= useIsFocused();

 
  useEffect(() => {
    const loopAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(witchAnim, {
              toValue: deviceWidth * 0.02,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(scaleXAnim, {
              toValue: -1,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
          Animated.delay(3000),
          Animated.parallel([
            Animated.timing(witchAnim, {
              toValue: 2 * deviceWidth,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(scaleXAnim, {
              toValue: -1,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(witchAnim, {
              toValue: -deviceWidth * 0.05,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(scaleXAnim, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
          Animated.delay(3000),
          Animated.parallel([
            Animated.timing(witchAnim, {
              toValue: -2 * deviceWidth,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(scaleXAnim, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ).start();
    };

    const cleanUpAnimation = () => {
      Animated.timing(witchAnim).stop();
      Animated.timing(scaleXAnim).stop();
    };
    loopAnimation();
    return cleanUpAnimation;
  }, [witchAnim, scaleXAnim]);

  const startGame = async (isNew=false) => {
    if(isNew){
      dispatch(resetGame());
    }
    SoundPlayer.stop();
    navigate('LudoBoardScreen')
    playSound('game_start');
  }
  
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim]);

  const renderButton = useCallback(
    (title, onPress) => <GradientButton title={title} onPress={onPress} />,
    [],
  );

  const handleNewGame = useCallback(() => {
    startGame(true);
  }, []);

  const handleResumePress = useCallback(() => {
    startGame();
  }, []);

  return (
    <Wrapper style={styles.mainContainer}>
      <View style={styles.imgContainer}>
        <Image source={Logo} style={styles.img} />
      </View>
      {currentPositions != 0 && renderButton('RESUME', handleResumePress)}
      {renderButton('NEW GAME', handleNewGame)}
      {renderButton('VS CPU', () =>
        showStyledAlert('Coming Soon!', 'Click on New Game')
      )}
      {renderButton('2 vs 2', () =>
        showStyledAlert('Coming Soon!', 'Click on New Game')
      )}

      <Animated.View
        style={[
          styles.witchContainer,
          {transform: [{translateX: witchAnim}, {scaleX: scaleXAnim}]},
        ]}>
        <Pressable
        onPress={()=>{
          const random = Math.floor(Math.random() * 3)+1;
          playSound(`girl${random}`);
        }}
        >
          <LottieView
            hardwareAccelerationAndroid={true}
            source={Witch}
            autoPlay
            speed={1}
            style={styles.witch}
          />
        </Pressable>
      </Animated.View>

      <Animated.Text style={[styles.artist, {opacity: fadeAnim}]}>
        Developed by: Gautam Kumar
      </Animated.Text>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'flex-start',
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
    alignSelf: 'center',
    width: deviceWidth * 0.6,
    height: deviceHeight * 0.15,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  artist: {
    position: 'absolute',
    bottom: 40,
    color: 'white',
    fontWeight: '800',
    opacity: 0.5,
    fontStyle: 'italic',
    fontSize: 16,
    alignSelf: 'center',
  },
  witch: {
    height: 250,
    width: 250,
    transform: [{rotate: '25deg'}],
  },
  witchContainer: {
    position: 'absolute',
    top: '65%',
    left: '24%',
  },
});

export default HomeScreen;
