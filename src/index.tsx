import * as React from 'react';
import useEventListener from '@use-it/event-listener';
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

const createCheatCodeMachine = (cheatCodeKeys: Array<string>) => {
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
              on: {
                '': {
                  target: '#cheatCode.enabled',
                  cond: 'cheatCodeEntered',
                  actions: 'reset',
                },
                keydown: {
                  target: 'recording',
                  actions: 'record',
                },
              },
            },
            recording: {
              on: {
                '': {
                  target: '#cheatCode.enabled',
                  cond: 'cheatCodeEntered',
                  actions: 'reset',
                },
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
              on: {
                '': {
                  target: '#cheatCode.disabled',
                  cond: 'cheatCodeEntered',
                  actions: 'reset',
                },
                keydown: {
                  target: 'recording',
                  actions: 'record',
                },
              },
            },
            recording: {
              on: {
                '': {
                  target: '#cheatCode.disabled',
                  cond: 'cheatCodeEntered',
                  actions: 'reset',
                },
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
};

export const useCheatCode = (cheatCodeKeys: Array<string>): boolean => {
  const [current, send] = useMachine(createCheatCodeMachine(cheatCodeKeys));
  useEventListener<React.KeyboardEvent>('keydown', send);
  return current.matches('enabled');
};

export const useSecretCode = useCheatCode;
