/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import * as React from 'react';
import { assign, createMachine } from 'xstate';
import { useMachine } from '@xstate/react';
import { isEqual, takeRight } from './utils';

interface CheatCodeContext {
  cheatCodeKeys?: Array<string>;
  typedKeys: Array<string>;
}

const initialContext: CheatCodeContext = {
  cheatCodeKeys: undefined,
  typedKeys: [],
};

type KeydownEvent = KeyboardEvent & { type: 'keydown' };

/** @xstate-layout N4IgpgJg5mDOIC5QGMAWYCGAXAwgewjAFkM0BLAOzADoIzYMAjAG0mrIlYGIBrMATwh4A7hUSgADnlhksZPGKQgAHogDMADgAs1AGxqArEYDsB3QCYNATgPGANCH6IAjNupatG57ucHDx3SstNQBfEIc0TFwCYlJUSho6BhY2Dm5xECkZOQUM1QQAWg0ABjVqIPMDZ2DzKw01c3MHJ0KtA3NqI2dTKuM1XQ1rAzCI9Gx8QhJyKlp6JlYIagAnMGQ8JboKKF4BIVEMrNl5RVB8iwNqeuKNAb8tCw17R0Qbcs9vcwHnK0C2kZBIuMYlN4jMkvM2Cs1htKNsDtIjrklPkCsYrGUKlUanUGk1noVzGodF00WZjOZTFZjFp-oDopM4glZskFstVutNttlLAsNgaBgAGZYMBLWgKMAAFX4Elh8Oyxzy6jc+iMtjMlhsTxa1Pc7y0xmK3UJHg0tLG9Ni0xoYAoEMWaTAO0EIhOmQROVdKL8zjelQaukCpS0zma6iJuq8A1JpQGZqiE0toOttpS9s4jrliM9iAKVmK1EaajRjXMxQN3g0oYQ3zeXmp7V0pWpFjjQIZVuoNrtbOhnKde1dhw9ioJeeo1PJ5m8VLUxWuuir5jatenQWchMCoXCAPNCZBTK7qZ7HNhXEzw+RObHheLjTLhoGi40HSCXh+s80ahsw23dL3jJmQ9WShE8ti4bleWFahBWFUUhCoKUZS2c8FUvQpvV9PxPkDIkQ3xRodBNXwtApXQDENGwwm3CgYngJQ-2BADEjmI8HRQpFThcXRjD0Qw1TzUsqX0RdiguV9unJOdyOCVsLX3MEWOA9kYWQpQh1QziEFsKxqEMYJvEMYpgkXZx83E4xJNEoyt1GeNGI7cFU3Y7Nq2CXiTAMATiiEtQqwKfMunqHxjFcWdg30WT-w7IDUnTZyR1RAwNEw6oGhxRoqyJQj3kGANKlEn9bLbRMDxTJTe1lNT3Q0lQczUIsC0JCzNC8LQrCpLV1EbFdtDaDqJMi+yk07MrIHitDUWfFLsXqDL8WqHSiJC65qSLYpdEG9sk3GzSigpaa0tmvEWgKdoeJJT8LFML8qJCIA */
const cheatCodeMachine = createMachine(
  {
    context: initialContext,
    tsTypes: {} as import('./index.typegen').Typegen0,
    schema: {
      context: {} as CheatCodeContext,
      events: {} as KeydownEvent,
    },
    id: 'cheatCodeMachine',
    initial: 'disabled',
    states: {
      disabled: {
        initial: 'idle',
        states: {
          idle: {
            always: {
              actions: 'resetTypedKeys',
              cond: 'cheatCodeEntered',
              target: '#cheatCodeMachine.enabled',
            },
            on: {
              keydown: {
                actions: 'record',
                target: '#cheatCodeMachine.disabled.recording',
              },
            },
          },
          recording: {
            after: {
              doneTyping: {
                actions: 'resetTypedKeys',
                target: '#cheatCodeMachine.disabled.idle',
              },
            },
            always: {
              actions: 'resetTypedKeys',
              cond: 'cheatCodeEntered',
              target: '#cheatCodeMachine.enabled',
            },
            on: {
              keydown: {
                actions: 'record',
                target: '#cheatCodeMachine.disabled.recording',
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
              actions: 'resetTypedKeys',
              cond: 'cheatCodeEntered',
              target: '#cheatCodeMachine.disabled',
            },
            on: {
              keydown: {
                actions: 'record',
                target: '#cheatCodeMachine.enabled.recording',
              },
            },
          },
          recording: {
            after: {
              doneTyping: {
                actions: 'resetTypedKeys',
                target: '#cheatCodeMachine.enabled.idle',
              },
            },
            always: {
              actions: 'resetTypedKeys',
              cond: 'cheatCodeEntered',
              target: '#cheatCodeMachine.disabled',
            },
            on: {
              keydown: {
                actions: 'record',
                target: '#cheatCodeMachine.enabled.recording',
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {
      record: assign({
        typedKeys: (context, event) => [...context.typedKeys, event.key],
      }),
      resetTypedKeys: assign({
        typedKeys: initialContext.typedKeys,
      }),
    },
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

export function useCheatCode(cheatCodeKeys: Array<string>): boolean {
  const machineOpts = React.useMemo(
    () => ({
      context: { cheatCodeKeys },
    }),
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

export const useSecretCode = useCheatCode;
