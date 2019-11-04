import React from 'react';
import { Text, View, Button } from 'react-native';
import { OnboardingContext } from 'app/navigation/Navigation';

export default function Onboarding() {
  const { setOnboardVisibility } = React.useContext(OnboardingContext);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Text style={{ textAlign: 'center' }}>Onboarding</Text>
      <Button title="Complete onboarding" onPress={() => setOnboardVisibility('mainApp')} />
    </View>
  );
}
