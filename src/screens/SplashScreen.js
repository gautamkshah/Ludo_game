import { View, Text, StyleSheet,Animated, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { deviceWidth ,deviceHeight} from '../constants/Scaling'
import Wrapper from '../components/Wrapper'
import Logo from '../assets/images/logo.png'
import { Image } from 'react-native'
import { prepareNavigation, resetAndNavigate } from '../helpers/NavigationUtil'

const SplashScreen = () => {
  const [isStop]=useState(false)
  const scale=new Animated.Value(1)

  useEffect(()=>{
    prepareNavigation()
    setTimeout(()=>{
      resetAndNavigate('HomeScreen')
    },2000)
  },[])

  useEffect(()=>{
    const breathingAnimation=
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale,{
            toValue: 1.2,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(scale,{
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          })
        ])
      ) 
      if(!isStop){
        breathingAnimation.start()
      }
      return ()=>{
        breathingAnimation.stop()
      }

    }
   ,[isStop])


  return (
    <Wrapper>
      <Animated.View style={[styles.imgContainer,{transform:[{scale}]}]}>
        <Image source={Logo} style={styles.img} />
      </Animated.View>
      <ActivityIndicator size='small' color='white' />
    </Wrapper>
  )
}

const styles=StyleSheet.create({
  imgContainer:{
    width: deviceWidth*0.7,
    height: deviceHeight*0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img:{
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  }
})

export default SplashScreen