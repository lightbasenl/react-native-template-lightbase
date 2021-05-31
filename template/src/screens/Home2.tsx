import React from 'react';
import View from 'components/View';
import { useHomeTabRoute } from 'hooks/useTypedNavigation';

export function Home2() {
  const route = useHomeTabRoute<'Home2'>();

  return <View.Screen style={{ backgroundColor: route.params.backgroundColor }} />;
}
