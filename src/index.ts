import * as React from 'react';
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';
import { isEqual, takeRight } from './utils';
import {
  KeyTrackingContext,
  KeyTrackingEvent,
  KeyTrackingState,
} from '../types';

const initialCheatCodeMachineContext: KeyTrackingContext = {
  typedKeys: [],
};

function createCheatCodeMachine(cheatCodeKeys: Array<string>) {
  return createMachine<KeyTrackingContext, KeyTrackingEvent, KeyTrackingState>(
    {
      id: 'cheatCode',
      initial: 'disabled',
      context: initialCheatCodeMachineContext,
      states: {
        disabled: {
          initial: 'idle',
          states: {
            idle: {
              always: [
                {
                  target: '#cheatCode.enabled',
                  cond: 'cheatCodeEntered',
                  actions: 'reset',
                },
              ],
              on: {
                keydown: {
                  target: 'recording',
                  actions: 'record',
                },
              },
            },
            recording: {
              always: [
                {
                  target: '#cheatCode.enabled',
                  cond: 'cheatCodeEntered',
                  actions: 'reset',
                },
              ],
              on: {
                keydown: {
                  target: 'recording',
                  actions: 'record',
                },
              },
              after: {
                DONE_TYPING: {
                  target: 'idle',
                  actions: 'reset',
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
                  target: '#cheatCode.disabled',
                  cond: 'cheatCodeEntered',
                  actions: 'reset',
                },
              ],
              on: {
                keydown: {
                  target: 'recording',
                  actions: 'record',
                },
              },
            },
            recording: {
              always: [
                {
                  target: '#cheatCode.disabled',
                  cond: 'cheatCodeEntered',
                  actions: 'reset',
                },
              ],
              on: {
                keydown: {
                  target: 'recording',
                  actions: 'record',
                },
              },
              after: {
                DONE_TYPING: {
                  target: 'idle',
                  actions: 'reset',
                },
              },
            },
          },
        },
      },
    },
    {
      delays: {
        DONE_TYPING: 2000,
      },
      actions: {
        reset: assign(initialCheatCodeMachineContext),
        record: assign({
          typedKeys: (context, event) => [...context.typedKeys, event.key],
        }),
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
  const [current, send] = useMachine(createCheatCodeMachine(cheatCodeKeys));

  React.useEffect(() => {
    window.addEventListener('keydown', send);
    return () => {
      window.removeEventListener('keydown', send);
    };
  }, [send]);

  return current.matches('enabled');
}

export const useSecretCode = useCheatCode;
