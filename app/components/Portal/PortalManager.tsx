import React, { useState, useImperativeHandle, useRef } from 'react';
import { View, StyleSheet } from 'react-native';

type State = {
  key: number;
  children: React.ReactNode;
}[];

export interface PortalRef {
  mount: (key: number, children: React.ReactNode) => void;
  update: (key: number, children: React.ReactNode) => void;
  unmount: (key: number) => void;
}

const PortalManager = React.forwardRef<PortalRef>((_, ref) => {
  const [portals, setPortals] = useState<State>([]);
  const portalRef = useRef<State>([]);

  useImperativeHandle(ref, () => {
    const mount = (key: number, children: React.ReactNode) => {
      portalRef.current = [...portalRef.current, { key, children }];
      setPortals(portalRef.current);
    };

    const update = (key: number, children: React.ReactNode) => {
      portalRef.current = portalRef.current.map((item) => {
        if (item.key === key) {
          return { ...item, children };
        }
        return item;
      });
      setPortals(portalRef.current);
    };

    const unmount = (key: number) => {
      portalRef.current = portalRef.current.filter((item) => item.key !== key);
      setPortals(portalRef.current);
    };

    return { mount, update, unmount };
  });

  return (
    <>
      {portals.map(({ key, children }) => (
        <View
          key={key}
          collapsable={
            false /* Need collapsable=false here to clip the elevations, otherwise they appear above sibling components */
          }
          pointerEvents="box-none"
          style={StyleSheet.absoluteFill}
        >
          {children}
        </View>
      ))}
    </>
  );
});

export default PortalManager;
