import View from 'components/View';
import { Button } from 'react-native';
import { useMainNavigation } from 'hooks/useTypedNavigation';

export function Modal() {
  const navigation = useMainNavigation();

  return (
    <View.Screen style={{ backgroundColor: 'orange', justifyContent: 'center' }}>
      <Button title="Open Second Modal" onPress={() => navigation.navigate('Modal2')} />
    </View.Screen>
  );
}
