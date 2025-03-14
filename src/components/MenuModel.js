import {View, Text, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {resetGame} from '../redux/reducers/gameSlice';
import {playSound} from '../helpers/SoundUtility';
import {goBack} from '../helpers/NavigationUtil';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import GradientButton from './GradientButton';

const MenuModel = ({visible, onPressHide}) => {
  const dispatch = useDispatch();
  
  const handleStartGame = useCallback(() => {
    dispatch(resetGame());
    playSound('game_start');
    onPressHide();
  }, [dispatch, onPressHide]);

  const handleHome = useCallback(() => {
    goBack();
  }, []);

  return (
    <Modal
      style={styles.bottomModalView}
      isVisible={visible}
      backdropColor="black"
      backdropOpacity={0.8}
      onBackdropPress={onPressHide}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackButtonPress={onPressHide}>
      <View style={styles.modalContainer}>
        <LinearGradient
          colors={['#0f0c29', '#302b63', '#24243e']}
          style={styles.gradientContainer}>
          <View style={styles.subView}>
            <GradientButton title="RESUME" onPress={onPressHide} />
            <GradientButton title="NEW GAME" onPress={handleStartGame} />
            <GradientButton title="HOME" onPress={handleHome} />
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomModalView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
  },
  gradientContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    padding: 20,
    paddingVertical: 40,
    width: '96%',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gold',
  },
  subView: {
    width: '100%',
    paddingLeft: 50,
    justifyContent: 'center',
    alignItems: 'left',
    alignSelf: 'center',
  },
  modalContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MenuModel;
