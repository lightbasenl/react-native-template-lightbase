import View from 'components/View';
import { useModalNavigation } from 'hooks/useTypedNavigation';
import { Button } from 'react-native';

export function Modal4() {
  const navigation = useModalNavigation();
  return (
    <View.Screen style={{ backgroundColor: 'orange', justifyContent: 'center' }}>
      <Button title="Open Modal5" onPress={() => navigation.navigate('Modal5')} />
    </View.Screen>
  );
}
