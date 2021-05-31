import { Dimensions } from 'react-native';
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

// Static screen sizes that on change dont cause re-renders
//  ensure if app is opened in landscape mode that the width and height values are correcflty reflected
let width = screenWidth;
let height = screenHeight;
if (screenWidth > screenHeight) {
  height = screenWidth;
  width = screenHeight;
}

export default function useStaticScreenSize() {
  return {
    height,
    width,
  };
}
