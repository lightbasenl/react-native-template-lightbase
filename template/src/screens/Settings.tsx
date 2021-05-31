import React from 'react';
import View from 'components/View';
import { useSettingsTabNavigation } from 'hooks/useTypedNavigation';
import { Button } from 'react-native';

export function Settings() {
  const navigation = useSettingsTabNavigation();
  return (
    <View.Screen style={{ justifyContent: 'center' }}>
      <Button
        title="Open Modal Stack"
        onPress={() => navigation.navigate('ModalNav', { screen: 'Modal3' })}
      />
    </View.Screen>
  );
}
