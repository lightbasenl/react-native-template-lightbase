import React, { useContext } from 'react';
import PortalConsumer from './PortalConsumer';
import PortalHost, { PortalContext } from './PortalHost';

Portal.Host = PortalHost;

export function Portal({ children }: { children: React.ReactNode }) {
  const manager = useContext(PortalContext);
  if (manager) {
    return <PortalConsumer manager={manager}>{children}</PortalConsumer>;
  }
  return null;
}
