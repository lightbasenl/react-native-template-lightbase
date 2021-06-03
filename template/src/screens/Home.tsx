import View from 'components/View';
import { useHomeTabNavigation } from 'hooks/useTypedNavigation';
import { Button } from 'react-native';

export function Home() {
  const navigation = useHomeTabNavigation();
  return (
    <View.Screen style={{ justifyContent: 'center' }}>
      <Button
        title="Nav to Home2"
        onPress={() => navigation.navigate('Home2', { backgroundColor: '#fefed2' })}
      />
      <Button title="Open Transparent Modal" onPress={() => navigation.navigate('TransparentModal')} />
    </View.Screen>
  );
}
