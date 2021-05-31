import React from 'react';
import View from 'components/View';
import { useModalNavigation } from 'hooks/useTypedNavigation';
import { Button } from 'react-native';

export function Modal5() {
  const navigation = useModalNavigation();
  return (
    <View.Screen style={{ backgroundColor: 'orange', justifyContent: 'center' }}>
      <Button
        title="Dismiss all"
        onPress={() =>
          navigation.navigate('TabNav', {
            screen: 'SettingsNav',
            params: { screen: 'Settings' },
          })
        }
      />
    </View.Screen>
  );
}
