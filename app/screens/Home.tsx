import React from 'react';
import { Text, View, Button } from 'react-native';
import { NavScreenProp } from 'app/navigation/Navigation';

export default function Home({ navigation }: NavScreenProp<'Home'>) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Text style={{ textAlign: 'center' }}>Home</Text>
      <Button title="Open Modal Screen" onPress={() => navigation.navigate('Modal')} />
    </View>
  );
}
