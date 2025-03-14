import { View, Text, StyleSheet, ImageBackground, SafeAreaView } from 'react-native'
import React from 'react'
import { deviceHeight, deviceWidth } from '../constants/Scaling'
import BG from '../assets/images/bg.jpeg'

const Wrapper = ({ children, style }) => {
  return (
    <ImageBackground source={BG} resizeMode="cover" >
      <SafeAreaView style={[styles.safeArea, style]}>
        {children}
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Wrapper
