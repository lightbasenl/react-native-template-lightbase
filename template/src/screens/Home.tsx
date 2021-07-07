import View from "components/View";
import { useHomeTabNavigation } from "hooks/useTypedNavigation";
import { useEffect } from "react";
import { Animated, Button } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function Home() {
  const navigation = useHomeTabNavigation();
  const animationTrigger = useSharedValue(0);

  useEffect(() => {
    animationTrigger.value = withTiming(1);
  }, [])
  
  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: animationTrigger.value,
      width: 200,
      height: 200,
      backgroundColor: "red",
    }),
    []
  );

  return (
    <View.Screen style={{ justifyContent: "center" }}>
      <Button
        title="Nav to Home2"
        onPress={() =>
          navigation.navigate("Home2", { backgroundColor: "#fefed2" })
        }
      />
      <Button
        title="Open Transparent Modal"
        onPress={() => navigation.navigate("TransparentModal")}
      />
     <Animated.View style={animatedStyle}  
      
      />
    </View.Screen>
  );
}
