import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConfigState {
  events: {
    carnaval: boolean;
    fexpocruz: boolean;
    climaInvierno: boolean;
  };
  toggleEvent: (event: keyof ConfigState['events']) => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      events: {
        carnaval: false,
        fexpocruz: false,
        climaInvierno: false,
      },
      toggleEvent: (event) => set((state) => ({
        events: {
          ...state.events,
          [event]: !state.events[event]
        }
      })),
    }),
    {
      name: 'nexo-config-store',
    }
  )
);
