import React from 'react';
import { View } from 'react-native';
import PortalManager from './PortalManager';

type Props = {
  children: React.ReactNode;
};

type Operation =
  | { type: 'mount'; key: number; children: React.ReactNode }
  | { type: 'update'; key: number; children: React.ReactNode }
  | { type: 'unmount'; key: number };

export interface PortalMethods {
  mount: (children: React.ReactNode) => number;
  update: (key: number, children: React.ReactNode) => void;
  unmount: (key: number) => void;
}

export const PortalContext = React.createContext<PortalMethods | null>(null);

export default class PortalHost extends React.Component<Props> {
  static displayName = 'Portal.Host';

  _nextKey = 0;
  _queue: Operation[] = [];
  _manager = React.createRef<PortalManager>();

  componentDidMount() {
    const manager = this._manager.current;
    const queue = this._queue;

    while (queue.length && manager) {
      const action = queue.pop();
      if (action) {
        switch (action.type) {
          case 'mount':
            manager.mount(action.key, action.children);
            break;
          case 'update':
            manager.update(action.key, action.children);
            break;
          case 'unmount':
            manager.unmount(action.key);
            break;
        }
      }
    }
  }

  _mount = (children: React.ReactNode) => {
    const key = this._nextKey++;

    if (this._manager.current) {
      this._manager.current.mount(key, children);
    } else {
      this._queue.push({ type: 'mount', key, children });
    }

    return key;
  };

  _update = (key: number, children: React.ReactNode) => {
    if (this._manager.current) {
      this._manager.current.update(key, children);
    } else {
      const op = { type: 'mount', key, children };
      const index = this._queue.findIndex(
        (o) => o.type === 'mount' || (o.type === 'update' && o.key === key)
      );

      if (index > -1) {
        //@ts-ignore
        this._queue[index] = op;
      } else {
        this._queue.push(op);
      }
    }
  };

  _unmount = (key: number) => {
    if (this._manager.current) {
      this._manager.current.unmount(key);
    } else {
      this._queue.push({ type: 'unmount', key });
    }
  };

  render() {
    return (
      <PortalContext.Provider
        value={{
          mount: this._mount,
          update: this._update,
          unmount: this._unmount,
        }}
      >
        {/* Need collapsable=false here to clip the elevations, otherwise they appear above Portal components */}
        <View style={{ flex: 1 }} collapsable={false}>
          {this.props.children}
        </View>
        <PortalManager ref={this._manager} />
      </PortalContext.Provider>
    );
  }
}
