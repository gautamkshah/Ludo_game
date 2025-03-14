import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { playSound } from '../helpers/SoundUtility';

const iconsSize = RFValue(18);

const GradientButton = ({title, onPress, iconColor = '#d5be3e'}) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={()=>{
            playSound('ui');
            onPress();
        }}
        activeOpacity={0.8}>
        <LinearGradient
          colors={['#4c699f', '#3b5998', '#d5be3e']}
          style={styles.button}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          {title == 'RESUME' ? (
            <MaterialIcons
              name="play-arrow"
              size={iconsSize}
              color={iconColor}
              style={{marginRight: 10}}
            />
          ) : title == 'NEW GAME' ? (
            <MaterialIcons
              name="play-circle"
              size={iconsSize}
              color={iconColor}
              style={{marginRight: 10}}
            />
          ) : title == 'VS CPU' ? (
            <MaterialIcons
              name="computer"
              size={iconsSize}
              color={iconColor}
              style={{marginRight: 10}}
            />
          ) : title == 'HOME' ? (
            <MaterialIcons
              name="home"
              size={iconsSize}
              color={iconColor}
              style={{marginRight: 10}}
            />
          ) : (
            <MaterialIcons
              name="person"
              size={iconsSize}
              color={iconColor}
              style={{marginRight: 10}}
            />
          )}
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 10,
    width: 2,
    borderColor: '#000',
    marginVertical: 10,
  },
  btnContainer: {
    padding: 3,
    borderWidth: 3,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
    shadowColor: '#d5be3e',
    shadowOpacity: 0.5,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 10,
    borderColor: '#d5be3e',
    width: 220,
  },
  buttonText: {
    color: 'white',
    fontSize: RFValue(16),
    width: '70%',
    textAlign: 'left',
    fontFamily: 'Philosopher-Bold',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 0,
    width: '100%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
});

export default GradientButton;
