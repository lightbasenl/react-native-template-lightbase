import create from 'zustand';
import produce from 'immer';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { name as appName } from '../../app.json';

export type StoreState = {
  rehydrated: boolean;
  theme: 'light' | 'dark';
  set: (fn: (state: StoreState) => void) => void;
};

export const useStore = create<StoreState>(
  persist(
    (set) => ({
      rehydrated: false,
      theme: 'light',
      set: (fn) => set(produce(fn)),
    }),
    {
      name: `${appName}-storage`,
      getStorage: () => AsyncStorage,
      onRehydrateStorage: () => (state) => {
        state?.set((store) => {
          store.rehydrated = true;
        });
      },
    }
  )
);

export function useUpdateStore() {
  return useStore((store) => store.set);
}
