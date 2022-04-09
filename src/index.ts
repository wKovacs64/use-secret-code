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

/** @xstate-layout N4IgpgJg5mDOIC5QGMAWYCGAXAwgewjAFkM0BLAOzADoIzYMAjAG0mrIlYGIBrMATwh4A7hUSgADnlhksZPGKQgAHogBMANgAc1DQFYADBoDMAdjVrjATj16ANCH6Jj16moCMhjaZNWNGgBZNAF9ghzRMXAJiUlRKGjoGFjYObnEQKRk5BXTVBCtdAz1NYw0rAINyrS1TBycEYoLLPXdTLQ1NAL0fUPD0bHxCEnIqWnomVghqACcwZDxpugooXgEhUXTM2XlFUDyArTVqUo1WqwN3dytTczrEK+NqT0srQ-19YrVekAiB6OG4qNEhM2LN5otKCtNtJtjklHl3AY2tQ9DYyvotAEAoE7ghjO4NNQanouqi1EZ8e5vr8okNYvExklJjM5gslitlLAsNgaBgAGZYMDTAAUQioABV+BJIQBKLg0wYxEYJcbJKZgtmQ6FZHa5dRmahFbRdDpqUxFLq4tQHQ1WMxFEkBVruLTGan9WlKwE0MAUEFTVJgVaCES7DIw7JhhHuJ1uV2eNoWGymYy4-zuahWTzuYwBcxXAy592RRUAhm+-3sThB7WwqOIc6PV1tLS2HPPeyORCmc7HfROu3ucmorTFv505XUCtqlng9nB9ZhraRvUIdsZgwVV6vPSBboBXEkgo1S7k7z+YxqKxjz1l0bT5kaiHLLi1lfw+7WjOkpF6dp6SlO3qdoM3-J1L3NU0AhvUt6XvP0ZyfedOW5QVqH5QURTFMBJWlZY5QVf44J9BDH1ZZ8oDfXUPzXRECm0coDC0GMNCYoDEF3HQTwTCotCsNRR2+ChongJRCInb1GUrQMqLhPZEG0agTR7Uwrm0AlTHYvFEWOTSulbAlvEsGCiMnYFEPI9lZPrBAugKFMXBqMpijaIpcXxAxdJJP8Wn8cw3TCH4PVgszVUmazVyxJTdxUtTmO8LSh0854KmdREWnxEyJPLUiUmrCKaL8I4GICaxri0Cl3DTUoiVUnNrFRU0qUC8SvRyyskK1JRl2o+S1wEnReM8dMAIqg8uwQfQjm40rujtbwAr6EtTMkh9IAKvq7R0EqytckwqomvNCW4r8LAMK8sraqgNpURAAFoY2OcoUxMIpzhaHNcTzJ5igqFpdyxFNBNCIA */
const cheatCodeMachine = createMachine(
  {
    context: initialContext,
    tsTypes: {} as import('./index.typegen').Typegen0,
    schema: { context: {} as CheatCodeContext, events: {} as KeydownEvent },
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
                target: 'recording',
              },
            },
          },
          recording: {
            after: {
              doneTyping: {
                actions: 'resetTypedKeys',
                target: 'idle',
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
                target: 'recording',
                internal: false,
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
                target: 'recording',
              },
            },
          },
          recording: {
            after: {
              doneTyping: {
                actions: 'resetTypedKeys',
                target: 'idle',
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
                target: 'recording',
                internal: false,
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

export const useSecretCode = /* c8 ignore next */ useCheatCode;
