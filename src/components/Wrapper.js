import { View, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import React from 'react';
import { deviceHeight, deviceWidth } from '../constants/Scaling';
import BG from '../assets/images/bg.jpeg';

const Wrapper = ({ children, style }) => {
  return (
    <ImageBackground source={BG} resizeMode="cover" style={styles.background}>
      <SafeAreaView style={[styles.safeArea, style]}>
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Wrapper;