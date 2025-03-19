import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import React, {use, useCallback, useEffect} from 'react';
import {deviceHeight, deviceWidth} from '../constants/Scaling';
import Wrapper from '../components/Wrapper';
import MenuIcon from '../assets/images/menu.png';
import {Image} from 'react-native';
import {playSound} from '../helpers/SoundUtility';
import MenuModel from '../components/MenuModel';
import {useIsFocused} from '@react-navigation/native';
import StartGame from '../assets/images/start.png';
import {useSelector} from 'react-redux';
import {
  selectPlayer1,
  selectPlayer2,
  selectPlayer3,
  selectPlayer4,
} from '../redux/reducers/gameSelector';
import WinModel from '../components/WinModel';
import {Colors} from '../constants/Colors';
import Dice from '../components/Dice';
import {selectDiceRolled} from '../redux/reducers/gameSelector';
import Pocket from '../components/Pocket';
import VerticalPath from '../components/path/VerticalPath';
import {Plot2Data} from '../helpers/PlotData';
import {Plot4Data} from '../helpers/PlotData';
import HorizontalPath from '../components/path/HorizontalPath';
import {Plot1Data} from '../helpers/PlotData';
import {Plot3Data} from '../helpers/PlotData';
import FourTriangles from '../components/path/FourTriangles';
const LudoBoardScreen = () => {
  const player1 = useSelector(selectPlayer1);
  const player2 = useSelector(selectPlayer2);
  const player3 = useSelector(selectPlayer3);
  const player4 = useSelector(selectPlayer4);
  const isDiceTouch = useSelector(selectDiceRolled);
  const winner = useSelector(state => state.game.winner);
  const isFocused = useIsFocused();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [showStartImage, setShowStartImage] = React.useState(false);

  const opacity = React.useRef(new Animated.Value(1)).current;

  const handleMenu = useCallback(() => {
    playSound('ui');
    setMenuVisible(true);
  }, []);

  useEffect(() => {
    if (isFocused) {
      setShowStartImage(true);
      const blinkAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      );
      blinkAnimation.start();
      const timeout = setTimeout(() => {
        blinkAnimation.stop();
        setShowStartImage(false);
      }, 2500);
      return () => {
        blinkAnimation.stop();
        clearTimeout(timeout);
      };
    }
  }, [isFocused]);

  return (
    <Wrapper>
      <TouchableOpacity onPress={handleMenu} style={styles.menuIcon}>
        <Image source={MenuIcon} style={styles.menuIconImage} />
      </TouchableOpacity>

      <View style={styles.container}>
        <View
          style={styles.flexrow}
          pointerEvents={isDiceTouch ? 'none' : 'auto'}>
          <Dice color={Colors.green} player={2} data={player2} />
          <Dice color={Colors.yellow} player={3} rotate data={player3} />
        </View>

        <View style={styles.ludoBoard}>
          <View style={styles.plotContainer}>
            <Pocket color={Colors.green} player={2} data={player2} />
            <VerticalPath cells={Plot2Data} color={Colors.yellow} />
            <Pocket color={Colors.yellow} player={3} data={player3} />
          </View>
          <View style={styles.pathContainer}>
            <HorizontalPath cells={Plot1Data} color={Colors.green} />
            <FourTriangles
              player1={player1}
              player2={player2}
              player3={player3}
              player4={player4}
            />
            <HorizontalPath cells={Plot3Data} color={Colors.blue} />
          </View>
          <View style={styles.plotContainer}>
            <Pocket color={Colors.red} player={1} data={player1} />
            <VerticalPath cells={Plot4Data} color={Colors.red} />
            <Pocket color={Colors.blue} player={4} data={player4} />
          </View>
        </View>

        <View
          style={styles.flexrow}
          pointerEvents={isDiceTouch ? 'none' : 'auto'}>
          <Dice color={Colors.red} player={1} data={player1} />
          <Dice color={Colors.blue} player={4} rotate data={player4} />
        </View>
      </View>

      {showStartImage && (
        <Animated.Image
          source={StartGame}
          style={{
            width: deviceWidth * 0.5,
            height: deviceHeight * 0.2,
            opacity,
            position: 'absolute',
          }}
        />
      )}

      {menuVisible && (
        <MenuModel
          visible={menuVisible}
          onPressHide={() => setMenuVisible(false)}
        />
      )}
      {winner != null && <WinModel winner={winner} />}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight * 0.5,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  ludoBoard: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    padding: 10,
  },
  menuIcon: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  menuIconImage: {
    width: 30,
    height: 30,
  },
  flexrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  plotContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#acc',
  },
  pathContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '20%',
    justifyContent: 'space-between',
    backgroundColor: '#71b2e3',
  },
});

export default LudoBoardScreen;
