import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {playSound} from '../helpers/SoundUtility';
import {goBack, resetAndNavigate} from '../helpers/NavigationUtil';
import {resetGame, announceWinner} from '../redux/reducers/gameSlice';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import Trophy from '../assets/animation/trophy.json';
import FireWorks from '../assets/animation/firework.json';
import HeartGirl from '../assets/animation/girl.json';
import GradientButton from './GradientButton';
import Pile from './Pile';
import { colorPlayer } from '../helpers/PlotData';

const WinModel = ({winner}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(!!winner);

  useEffect(() => {
    setVisible(!!winner);
  }, [winner]);

  const handleNewGame = () => {
    dispatch(resetGame());
    dispatch(announceWinner(null));
    playSound('game_start');
  };

  const handleHome = () => {
    dispatch(resetGame());
    dispatch(announceWinner(null));
    resetAndNavigate('HomeScreen');
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      backdropColor="black"
      backdropOpacity={0.8}
      onBackdropPress={() => {}}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackButtonPress={() => {}}>
      <LinearGradient
        colors={['#0f0c29', '#302b63', '#24243e']}
        style={styles.gradientContainer}>
        <View style={styles.content}>
          <View style={styles.pileContainer}>
            <Pile player={winner} color={colorPlayer[winner-1]} />
          </View>
          <Text style={styles.congratsText}>
            Congratulations Player {winner}!
          </Text>
          <LottieView
            autoPlay
            hardwareAccelerationAndroid
            loop={false}
            source={Trophy}
            style={styles.trophyAnimation}
          />
          <LottieView
            autoPlay
            hardwareAccelerationAndroid
            loop={true}
            source={FireWorks}
            style={styles.fireWorksAnimation}
          />
          <View style={styles.buttonContainer}>
            <GradientButton title="NEW GAME" onPress={handleNewGame} />
            <GradientButton title="HOME" onPress={handleHome} />
          </View>
        </View>
      </LinearGradient>
      <LottieView
        autoPlay
        hardwareAccelerationAndroid
        loop={true}
        source={HeartGirl}
        style={styles.girlAnimation}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientContainer: {
    borderRadius: 20,
    width: '90%',
    borderWidth: 2,
    justifyContent: 'center',
    paddingVertical: 30,
    alignItems: 'center',
    borderColor: 'gold',
    overflow: 'hidden',
    position: 'relative', // Ensure relative positioning for child elements
  },
  content: {
    width: '100%',
    alignItems: 'center',
    zIndex: 1, // Ensure content is above the fireworks
  },
  pileContainer: {
    width: 90,
    height: 40,
    marginBottom: 20,
  },
  trophyAnimation: {
    height: 200,
    width: 200,
    marginTop: 20,
  },
  fireWorksAnimation: {
    height: 500,
    width: 500,
    position: 'absolute',
    top: -100,
    left: -50,
    zIndex: -1, // Ensure fireworks are behind the content
  },
  girlAnimation: {
    height: 350,
    width: 360,
    position: 'absolute',
    bottom: -200,
    right: -120,
    zIndex: 99,
  },
  congratsText: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Philosopher-Bold',
    marginTop: 10,
    textAlign: 'center', // Center the text horizontally
    flexShrink: 1, // Prevent text from wrapping
  },
  buttonContainer: {
    width: '80%',
    marginTop: 30,
  },
});

export default WinModel;