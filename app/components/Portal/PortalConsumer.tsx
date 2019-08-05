import React, { useRef, useEffect } from 'react';
import { PortalMethods } from './PortalHost';

type Props = {
  manager: PortalMethods;
  children: React.ReactNode;
};

export default function PortalConsumer({ manager, children }: Props) {
  const key = useRef(-1);

  useEffect(() => {
    if (key.current < 0) {
      key.current = manager.mount(children);
    } else {
      manager.update(key.current, children);
    }
    if (!children) {
      return () => manager.unmount(key.current);
    }
  }, [children, manager]);

  return null;
}
