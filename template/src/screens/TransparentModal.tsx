import { useEffect } from 'react';
import View from 'components/View';
import { Button, StyleSheet, useWindowDimensions } from 'react-native';
import { useMainNavigation } from 'hooks/useTypedNavigation';
import Touch from 'components/Touch';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export function TransparentModal() {
  const navigation = useMainNavigation();
  const { height } = useWindowDimensions();
  const translateY = useSharedValue(height);
  const modalViewStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    translateY.value = withTiming(0);
  }, [translateY]);

  return (
    <View.Screen style={{ justifyContent: 'center' }}>
      <Touch.Base
        backgroundColor="rgba(0,0,0,0.6)"
        style={[StyleSheet.absoluteFill]}
        onPress={() => navigation.goBack()}
      />
      <Animated.View
        style={[
          modalViewStyle,
          { height: 200, backgroundColor: 'white', justifyContent: 'center', margin: 20 },
        ]}
      >
        <Button title="Close" onPress={() => navigation.goBack()} />
      </Animated.View>
    </View.Screen>
  );
}
