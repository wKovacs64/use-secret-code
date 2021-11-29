import * as React from 'react';
import { createModel } from 'xstate/lib/model';
import { useMachine } from '@xstate/react';
import { isEqual, takeRight } from './utils';

const initialContext: CheatCodeContext = {
  cheatCodeKeys: undefined,
  typedKeys: [],
};

const creators = {
  events: {
    keydown: (event: KeyboardEvent) => ({ key: event.key }),
  },
};

const cheatCodeModel = createModel(initialContext, creators);

const resetTypedKeys = cheatCodeModel.assign({
  typedKeys: initialContext.typedKeys,
});

const record = cheatCodeModel.assign(
  {
    typedKeys: (context, event) => [...context.typedKeys, event.key],
  },
  'keydown',
);

const cheatCodeMachine = cheatCodeModel.createMachine(
  {
    id: 'cheatCodeMachine',
    initial: 'disabled',
    states: {
      disabled: {
        id: 'disabled',
        initial: 'idle',
        states: {
          idle: {
            always: [
              {
                cond: 'cheatCodeEntered',
                actions: [resetTypedKeys],
                target: '#enabled',
              },
            ],
            on: {
              keydown: {
                actions: [record],
                target: 'recording',
              },
            },
          },
          recording: {
            always: [
              {
                cond: 'cheatCodeEntered',
                actions: [resetTypedKeys],
                target: '#enabled',
              },
            ],
            on: {
              keydown: {
                actions: [record],
                target: 'recording',
              },
            },
            after: {
              doneTyping: {
                actions: [resetTypedKeys],
                target: 'idle',
              },
            },
          },
        },
      },
      enabled: {
        id: 'enabled',
        initial: 'idle',
        states: {
          idle: {
            always: [
              {
                cond: 'cheatCodeEntered',
                actions: [resetTypedKeys],
                target: '#disabled',
              },
            ],
            on: {
              keydown: {
                actions: [record],
                target: 'recording',
              },
            },
          },
          recording: {
            always: [
              {
                cond: 'cheatCodeEntered',
                actions: [resetTypedKeys],
                target: '#disabled',
              },
            ],
            on: {
              keydown: {
                actions: [record],
                target: 'recording',
              },
            },
            after: {
              doneTyping: {
                actions: [resetTypedKeys],
                target: 'idle',
              },
            },
          },
        },
      },
    },
  },
  {
    delays: {
      doneTyping: 2000,
    },
    guards: {
      cheatCodeEntered: (context) =>
        Array.isArray(context.cheatCodeKeys) &&
        isEqual(
          takeRight(context.typedKeys, context.cheatCodeKeys.length),
          context.cheatCodeKeys,
        ),
    },
  },
);

interface CheatCodeContext {
  cheatCodeKeys?: Array<string>;
  typedKeys: Array<string>;
}

export function useCheatCode(cheatCodeKeys: Array<string>): boolean {
  const machineOpts = React.useMemo(
    () => ({
      context: { cheatCodeKeys },
    }),
    [cheatCodeKeys],
  );

  const [state, send] = useMachine(cheatCodeMachine, machineOpts);

  React.useEffect(() => {
    const handleKeyboardEvent = (event: KeyboardEvent) => {
      send(cheatCodeModel.events.keydown(event));
    };

    window.addEventListener('keydown', handleKeyboardEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyboardEvent);
    };
  }, [send]);

  return state.matches('enabled');
}

export const useSecretCode = useCheatCode;
