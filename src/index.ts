import * as React from 'react';
import { createModel } from 'xstate/lib/model';
import { useMachine } from '@xstate/react';
import { isEqual, takeRight } from './utils';

const initialContext: CheatCodeContext = {
  typedKeys: [],
};

const creators = {
  events: {
    keydown: (event: KeyboardEvent) => ({ key: event.key }),
  },
};

const cheatCodeModel = createModel(initialContext, creators);

const reset = cheatCodeModel.assign(initialContext);

const record = cheatCodeModel.assign(
  {
    typedKeys: (context, event) => [...context.typedKeys, event.key],
  },
  'keydown',
);

function createCheatCodeMachine(cheatCodeKeys: Array<string>) {
  return cheatCodeModel.createMachine(
    {
      id: 'cheatCode',
      initial: 'disabled',
      context: initialContext,
      states: {
        disabled: {
          initial: 'idle',
          states: {
            idle: {
              always: [
                {
                  cond: 'cheatCodeEntered',
                  actions: [reset],
                  target: '#cheatCode.enabled',
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
                  actions: [reset],
                  target: '#cheatCode.enabled',
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
                  actions: [reset],
                  target: 'idle',
                },
              },
            },
          },
        },
        enabled: {
          initial: 'idle',
          states: {
            idle: {
              always: [
                {
                  cond: 'cheatCodeEntered',
                  actions: [reset],
                  target: '#cheatCode.disabled',
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
                  actions: [reset],
                  target: '#cheatCode.disabled',
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
                  actions: [reset],
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
          isEqual(
            takeRight(context.typedKeys, cheatCodeKeys.length),
            cheatCodeKeys,
          ),
      },
    },
  );
}

export function useCheatCode(cheatCodeKeys: Array<string>): boolean {
  const [state, send] = useMachine(createCheatCodeMachine(cheatCodeKeys));

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

interface CheatCodeContext {
  typedKeys: Array<string>;
}
