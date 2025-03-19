import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { playSound } from '../helpers/SoundUtility';

const iconsSize = RFValue(18);

const GradientButton = ({ title, onPress, iconColor = '#FFD700' }) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => {
          playSound('ui');
          onPress();
        }}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#4c699f', '#3b5998', '#d5be3e']}
          style={styles.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MaterialIcons
            name={
              title === 'RESUME' ? 'play-arrow' :
              title === 'NEW GAME' ? 'play-circle' :
              title === 'VS CPU' ? 'computer' :
              title === 'HOME' ? 'home' : 'person'
            }
            size={iconsSize}
            color={iconColor}
            style={styles.icon}
          />
          <Text style={styles.buttonText} numberOfLines={1}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  btnContainer: {
    padding: 3,
    borderWidth: 3,
    borderRadius: 12,
    elevation: 6,
    backgroundColor: '#ffffff',
    shadowColor: '#d5be3e',
    shadowOpacity: 0.4,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 8,
    borderColor: '#d5be3e',
    width: 230,
  },
  button: {
    paddingHorizontal: 20,
    width: '100%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: RFValue(16),
    fontFamily: 'Philosopher-Bold',
    textAlign: 'center',
    flexShrink: 1,
  },
});

export default GradientButton;
