/* eslint-disable @typescript-eslint/consistent-type-assertions */
import * as React from 'react';
import { assign, setup } from 'xstate';
import { useMachine } from '@xstate/react';
import { isEqual, takeRight } from './utils';

type CheatCodeContext = {
  cheatCodeKeys?: string[];
  typedKeys: string[];
};

type CheatCodeMachineInput = {
  cheatCodeKeys: CheatCodeContext['cheatCodeKeys'];
};

const initialContext: CheatCodeContext = {
  cheatCodeKeys: undefined,
  typedKeys: [],
};

type KeydownEvent = KeyboardEvent & { type: 'keydown' };

/** @xstate-layout N4IgpgJg5mDOIC5QGMAWYCGAXAwgewjAFkM0BLAOzADoIzYMAjAG0mrIlYGIBrMATwh4A7hQDaABgC6iUAAc8sMljJ4KskAA9EAJgCsAdmoBGCQBYAHHoDMANjOnbei7YA0IfojMTb1B7YsATgtjAxsgs1sAXyj3NExcAmJSVEoaOgYWNg5uSRkkEAUlFTUNbQQdY189Y1qJPUiDQJtjM3dPBEDjaltrGusB2oMdHVsDGLj0bHxCEnIqWnomVghqACcwZDw1ugooXgEhUTyNIuVVdQLyhrMTYcCuiwljYIlrdsRrAwk-Z76LaxvL71aKxEDxaZJOapBYZZZsDZbHaUfYnApnEqXUDlQJOHoWEIPF6AqoGD4VELUerPCw6CJhWw6CbgqaJWYpNKLTIrdabba7faaWBYbA0DAAMywYDWAAohFQACr8OQogCUXAhbOS83SSyyq0R-JRaPkinOpSuuh0gWowLMzVadJqzXJdKMxn0ZjsXsMwTMzM1M21MJoYAo8NWOTAB0EInE0lOZsxZUQpgMt3T5kBb09ZjJHkQBmstx0kUs+gkpYsTQDrKD0M5YYj7E40ZNhSTFxTFSq1BqdQaY2a1la5Nsxgs1AMdTGYVa3nGYMDUI5Cyb+t5SIFMaO8fypuKXctCGM1geff0gWsFm8enquLHzT7ekZOgM1cqgP9S7rK511HXHlDWRPYuHbDEj2xVN9GsZ9zEHV9rz0clvBtfwCUrG9RmaPRawSetV1DcMN2A7chRFKVqAlKVZXlMAlRVPZ1WXdl-0AhE+RAqBwM7C0oJPCRAh0KdRiCO871pMw2gLBBxz0Kc6mLWwHgBJlmQoJJ4AKFjg05OENyjRNDz4rREACPwXyaadcRCMZkJkkcfi+BpnBqWwxh0aw8MhViQy5ZtSJRIzzSxUyEDMZxbQePMCVqD0hPJRzbTCCKrCqDyvJ-fC-z8-SVmC5Njx0H4IqHayAlJeyOheScPQaUI7BsFo1MmbLfMbYieUM9FeNCnFGXxQIvQed8fBHMc7GoatagGZpcRGYxvK1Bs106jityCnrjL66ChN+YJVLGWl8w6XpfGm08zz0eaRiWgi2LWiACsgsKuluAIhrPQJRt6YxyT0UYFNMYwX2ta8xjunK0mekzygAWjfPsvWKuk3gnax9FdHo+hBic5okLDQhiGIgA */
const cheatCodeMachine = setup({
  types: {} as {
    // typegen: {};
    context: CheatCodeContext;
    events: KeydownEvent;
    input: CheatCodeMachineInput;
  },
  actions: {
    record: assign({
      typedKeys: ({ context, event }) => [...context.typedKeys, event.key],
    }),
    resetTypedKeys: assign({
      typedKeys: initialContext.typedKeys,
    }),
  },
  delays: {
    doneTyping: 2000,
  },
  guards: {
    cheatCodeEntered: ({ context }) => {
      return (
        Array.isArray(context.cheatCodeKeys) &&
        isEqual(
          takeRight(context.typedKeys, context.cheatCodeKeys.length),
          context.cheatCodeKeys,
        )
      );
    },
  },
}).createMachine({
  context: ({ input }) => ({ ...initialContext, ...input }),
  id: 'cheatCodeMachine',
  initial: 'disabled',
  states: {
    disabled: {
      initial: 'idle',
      states: {
        idle: {
          always: {
            target: '#cheatCodeMachine.enabled',
            guard: 'cheatCodeEntered',
            actions: 'resetTypedKeys',
          },
          on: {
            keydown: {
              target: 'recording',
              actions: 'record',
            },
          },
        },
        recording: {
          after: {
            doneTyping: {
              target: '#cheatCodeMachine.disabled.idle',
              actions: ['resetTypedKeys'],
              reenter: true,
            },
          },
          always: {
            target: '#cheatCodeMachine.enabled',
            guard: 'cheatCodeEntered',
            actions: 'resetTypedKeys',
          },
          on: {
            keydown: {
              target: 'recording',
              actions: 'record',
              reenter: true,
            },
          },
        },
      },
    },
    enabled: {
      initial: 'idle',
      states: {
        idle: {
          always: {
            target: '#cheatCodeMachine.disabled',
            guard: 'cheatCodeEntered',
            actions: 'resetTypedKeys',
          },
          on: {
            keydown: {
              target: 'recording',
              actions: 'record',
            },
          },
        },
        recording: {
          after: {
            doneTyping: {
              target: '#cheatCodeMachine.enabled.idle',
              actions: ['resetTypedKeys'],
              reenter: true,
            },
          },
          always: {
            target: '#cheatCodeMachine.disabled',
            guard: 'cheatCodeEntered',
            actions: 'resetTypedKeys',
          },
          on: {
            keydown: {
              target: 'recording',
              actions: 'record',
              reenter: true,
            },
          },
        },
      },
    },
  },
});

export function useCheatCode(cheatCodeKeys: string[]): boolean {
  const machineOpts = React.useMemo<{ input: CheatCodeMachineInput }>(
    () => ({ input: { cheatCodeKeys } }),
    [cheatCodeKeys],
  );

  const [state, send] = useMachine(cheatCodeMachine, machineOpts);

  React.useEffect(() => {
    const handleKeydownEvent = (event: KeyboardEvent) => {
      send(event as KeydownEvent);
    };

    window.addEventListener('keydown', handleKeydownEvent);

    return () => {
      window.removeEventListener('keydown', handleKeydownEvent);
    };
  }, [send]);

  return state.matches('enabled');
}

export const useSecretCode = /* c8 ignore next */ useCheatCode;
