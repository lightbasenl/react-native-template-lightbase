import React from 'react';
import { Keyboard, Platform, KeyboardEventListener, Dimensions } from 'react-native';

export default function useKeyBoardVisibility() {
  const { height } = Dimensions.get('window');
  const [isKeyBoardVisible, setIsKeyboardVisible] = React.useState(false);
  const [visibleHeight, setVisibleHeight] = React.useState(height);

  React.useEffect(() => {
    const handleKeyboardShow: KeyboardEventListener = (e) => {
      setIsKeyboardVisible(true);
      setVisibleHeight(height - e.endCoordinates.height);
    };

    const handleKeyboardHide = () => {
      setIsKeyboardVisible(false);
      setVisibleHeight(height);
    };

    if (Platform.OS === 'ios') {
      Keyboard.addListener('keyboardWillShow', handleKeyboardShow);
      Keyboard.addListener('keyboardWillHide', handleKeyboardHide);
    } else {
      Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
      Keyboard.addListener('keyboardDidHide', handleKeyboardHide);
    }
    return () => {
      if (Platform.OS === 'ios') {
        Keyboard.removeListener('keyboardWillShow', handleKeyboardShow);
        Keyboard.removeListener('keyboardWillHide', handleKeyboardHide);
      } else {
        Keyboard.removeListener('keyboardDidShow', handleKeyboardShow);
        Keyboard.removeListener('keyboardDidHide', handleKeyboardHide);
      }
    };
  }, []);

  return {
    visibleHeight,
    isKeyBoardVisible,
  };
}
