import React from 'react';
import View from 'components/View';
import { Button } from 'react-native';
import { useModalNavigation } from 'hooks/useTypedNavigation';

export function Modal3() {
  const navigation = useModalNavigation();

  return (
    <View.Screen style={{ backgroundColor: 'orange', justifyContent: 'center' }}>
      <Button title="Open Modal4" onPress={() => navigation.navigate('Modal4')} />
    </View.Screen>
  );
}
