import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectCurrentPlayerChance,
  selectDiceNo,
  selectDiceRolled,
} from '../redux/reducers/gameSelector';
import {BackgroundImage} from '../helpers/GetIcons';
import {
  enableCellSelection,
  enablePileSelection,
  updatePlayerChance,
} from '../redux/reducers/gameSlice';
import {rollDice} from '../redux/reducers/gameReducer';
import LottieView from 'lottie-react-native';
import DiceRoll from '../assets/animation/diceroll.json';
import Arrow from '../assets/images/arrow.png';
import {playSound} from '../helpers/SoundUtility';
import {updateDiceNo} from '../redux/reducers/gameSlice';
import LinearGradient from 'react-native-linear-gradient';

const Dice = React.memo(({color, rotate, player, data}) => {
  const dispatch = useDispatch();
  const currentPlayerChance = useSelector(selectCurrentPlayerChance);
  const isDiceRolled = useSelector(selectDiceRolled);
  const diceNo = useSelector(selectDiceNo);
  const playerPieces = useSelector(
    state => state.game[`player${currentPlayerChance}`],
  );
  const pileIcon = BackgroundImage.GetImage(color);
  const diceIcon = BackgroundImage.GetImage(diceNo);
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const arrowAnim = useRef(new Animated.Value(0)).current;
  const [diceRolling, setDiceRolling] = React.useState(false);
  // console.log(player);

  const handleDicePress = async () => {
    const randomDice = Math.floor(Math.random() * 6) + 1;
    // const randomDice = 2;
    playSound('dice_roll');

    setDiceRolling(true);
    await delay(600);
    dispatch(updateDiceNo({diceNo: randomDice}));
    setDiceRolling(false);
    // console.log('data', data);

    const isAnyPieceAlive = data?.findIndex(i => i.pos != 0 && i.pos != 57);
    // Alert.alert(isAnyPieceAlive.toString());
    const isAnyPieceLocked = data?.findIndex(i => i.pos == 0);
    if (isAnyPieceAlive == -1) {
      if (randomDice == 6) {
        dispatch(enablePileSelection({playerNo: player}));
      } else {
        let chancePlayer = player + 1;
        if (chancePlayer > 4) {
          chancePlayer = 1;
        }
        await delay(600);
        dispatch(updatePlayerChance({chancePlayer: chancePlayer}));
      }
    } else {
      const canMove = playerPieces.some(
        pile => pile.travelCount + randomDice <= 57 && pile.pos != 0,
      );
      // console.log('pile', canMove.toString());
      //  Alert.alert(canMove.toString());
      if (
        (!canMove && randomDice == 6 && isAnyPieceLocked == -1) ||
        (!canMove && randomDice != 6 && isAnyPieceLocked != -1) ||
        (!canMove && randomDice != 6 && isAnyPieceLocked == -1)
      ) {
        let chancePlayer = player + 1;

        if (chancePlayer > 4) {
          chancePlayer = 1;
        }

        await delay(600);
        dispatch(updatePlayerChance({chancePlayer: chancePlayer}));
        return;
      }

      if (randomDice == 6) {
        dispatch(enablePileSelection({playerNo: player}));
      }
      dispatch(enableCellSelection({playerNo: player}));
    }
  };

  useEffect(() => {
    const animatedArrow = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(arrowAnim, {
            toValue: 10,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.in(Easing.ease),
          }),
          Animated.timing(arrowAnim, {
            toValue: -10,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.in(Easing.ease),
          }),
        ]),
      ).start();
    };
    animatedArrow();
  }, [currentPlayerChance, isDiceRolled]);

  return (
    <View style={[styles.flexrow, {transform: [{scaleX: rotate ? -1 : 1}]}]}>
      <View style={styles.border1}>
        <LinearGradient
          style={styles.linearGradient}
          colors={['#0052be', '#5f9fcb', '#97c6c9']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}>
          <View style={styles.pileContainer}>
            <Image source={pileIcon} style={styles.pileIcon} />
          </View>
        </LinearGradient>
      </View>
      <View style={styles.border2}>
        <View style={styles.diceGradient}>
          <View style={styles.diceContainer}>
            {currentPlayerChance == player ? (
              <>
                {diceRolling ? null : (
                  <TouchableOpacity
                    disabled={isDiceRolled}
                    activeOpacity={0.4}
                    onPress={handleDicePress}>
                    <Image source={diceIcon} style={styles.dice} />
                  </TouchableOpacity>
                )}
              </>
            ) : null}
          </View>
        </View>
      </View>

      {currentPlayerChance === player && !isDiceRolled ? (
        <Animated.View style={{transform: [{translateX: arrowAnim}]}}>
          <Image source={Arrow} style={{width: 30, height: 30}} />
        </Animated.View>
      ) : null}

      {currentPlayerChance === player && diceRolling ? (
        <LottieView
          source={DiceRoll}
          style={styles.rollingDice}
          loop={true}
          autoPlay
          hardwareAccelerationAndroid={true}
        />
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  flexrow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  diceContainer: {
    backgroundColor: '#e8c0c1',
    borderWidth: 1,
    borderRadius: 5,
    width: 55,
    height: 55,
    paddingHorizontal: 8,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pileIcon: {
    height: 35,
    width: 35,
  },
  pileContainer: {
    paddingHorizontal: 3,
    paddingVertical: 10,
    paddingRight: 10,
  },
  linearGradient: {
    padding: 1,
    borderWidth: 3,
    borderRightWidth: 0,
    borderColor: '#f0ce2c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dice: {
    height: 45,
    width: 45,
  },
  rollingDice: {
    height: 80,
    width: 80,
    zIndex: 99,
    right: 25,
    top: -25,
    position: 'absolute',
  },
  diceGradient: {
    borderWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#f0ce2c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  border1: {
    borderWidth: 3,
    borderRightWidth: 0,
    borderColor: '#f0ce2c',
  },
  border2: {
    borderWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#aac8ab',
    padding: 1,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderColor: '#aac8ab',
  },
});

export default Dice;
