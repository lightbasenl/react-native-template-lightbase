import View from 'components/View';
import { Button } from 'react-native';
import { useProfileTabNavigation } from 'hooks/useTypedNavigation';

export function Profile() {
  const navigation = useProfileTabNavigation();
  return (
    <View.Screen style={{ justifyContent: 'center' }}>
      <Button title="Open Modal" onPress={() => navigation.navigate('Modal')} />
    </View.Screen>
  );
}
