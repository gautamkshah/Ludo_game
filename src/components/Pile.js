import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  Easing,
  Alert,
} from 'react-native';
import React, {useRef, useMemo, useCallback, memo, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Colors} from '../constants/Colors';
import {Svg, Circle} from 'react-native-svg';
import PileGreen from '../assets/images/piles/green.png';
import PileRed from '../assets/images/piles/red.png';
import PileBlue from '../assets/images/piles/blue.png';
import PileYellow from '../assets/images/piles/yellow.png';
import {
  selectPocketPileSelection,
  selectCellSelection,
  selectDiceNo,
} from '../redux/reducers/gameSelector';

const Pile = ({cell, pieceId, color, player, onPress}) => {
  const rotation = useRef(new Animated.Value(0)).current;
  const currentPlayerPileSelection = useSelector(selectPocketPileSelection);
  const currentPlayerCellSelection = useSelector(selectCellSelection);
  const diceNo = useSelector(selectDiceNo);
  const playerPieces = useSelector(state => state.game[`player${player}`]);
  // console.log(currentPlayerPileSelection, currentPlayerCellSelection);
  // console.log(player, currentPlayerPileSelection, currentPlayerCellSelection);
  // console.log(cell, pieceId, color, player, onPress);

  const isPileEnabled = useMemo(
    () => player === currentPlayerPileSelection,
    [player, currentPlayerPileSelection],
  );

  const isCellEnabled = useMemo(
    () => player === currentPlayerCellSelection,
    [player, currentPlayerCellSelection],
  );
  // console.log(cell, pieceId, color, player, onPress);
  // Alert.alert('isCellEnabled', isCellEnabled.toString());

  const isForwardable = useCallback(() => {
    const piece = playerPieces?.find(item => item.id === pieceId);
    return piece && piece.travelCount + diceNo <= 57;
  }, [playerPieces, pieceId, diceNo]);

  const getPileImage = useMemo(() => {
    switch (color) {
      case Colors.green:
        return PileGreen;
      case Colors.red:
        return PileRed;
      case Colors.blue:
        return PileBlue;
      case Colors.yellow:
        return PileYellow;
      default:
        return PileGreen;
    }
  }, [color]);

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    );
    rotateAnimation.start();
    return () => rotateAnimation.stop();
  }, [rotation]);

  const rotateInterPolate = useMemo(
    () =>
      rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    [rotation],
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.5}
      disabled={!(cell ? isCellEnabled && isForwardable() : isPileEnabled)}>
      <View style={styles.hollowCircle}>
        {(cell ? isCellEnabled && isForwardable() : isPileEnabled) && (
          <View style={styles.dashedCircleContainer}>
            <Animated.View
              style={[
                styles.dashedCircle, 
                {transform: [{rotate: rotateInterPolate}]},
              ]}>
              <Svg height="18" width="18">
                <Circle
                  cx="9"
                  cy="9"
                  r="8"
                  stroke={'white'}
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="transparent"
                  strokeDashoffset="0"
                />
              </Svg>
            </Animated.View>
          </View>
        )}
      </View>
      <Image
        source={getPileImage}
        style={{width: 32, height: 32, position: 'absolute', top: -16}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    alignSelf: 'center',
  },
  hollowCircle: {
    width: 15,
    height: 15,
    position: 'absolute',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashedCircleContainer: {
    position: 'absolute',
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    top: -8,
  },
  dashedCircle: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashedCircleImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    borderColor: 'pink',
    borderWidth: 4,
    borderRadius: 50,
  },
});

export default memo(Pile);
