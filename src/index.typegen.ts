// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': { type: '' };
    'xstate.after(doneTyping)#cheatCodeMachine.disabled.recording': {
      type: 'xstate.after(doneTyping)#cheatCodeMachine.disabled.recording';
    };
    'xstate.after(doneTyping)#cheatCodeMachine.enabled.recording': {
      type: 'xstate.after(doneTyping)#cheatCodeMachine.enabled.recording';
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    record: 'keydown';
    resetTypedKeys:
      | ''
      | 'xstate.after(doneTyping)#cheatCodeMachine.disabled.recording'
      | 'xstate.after(doneTyping)#cheatCodeMachine.enabled.recording';
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    cheatCodeEntered: '';
  };
  eventsCausingDelays: {
    doneTyping: 'keydown';
  };
  matchesStates:
    | 'disabled'
    | 'disabled.idle'
    | 'disabled.recording'
    | 'enabled'
    | 'enabled.idle'
    | 'enabled.recording'
    | { disabled?: 'idle' | 'recording'; enabled?: 'idle' | 'recording' };
  tags: never;
}
