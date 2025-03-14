import {View, Text, StyleSheet, Animated, Easing, Image} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectCurrentPlayerChance,
  selectDiceNo,
  selectDiceRolled,
} from '../redux/reducers/gameSelector';
import {BackgroundImage} from '../helpers/GetIcons';
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

  useEffect(() => {
    const animatedArrow = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(arrowAnim, {
            toValue: 10,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          }),
          Animated.timing(arrowAnim, {
            toValue: -10,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
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
    height: 85,
    width: 85,
    zIndex: 99,
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
