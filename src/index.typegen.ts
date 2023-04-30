
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"xstate.after(doneTyping)#cheatCodeMachine.disabled.recording": { type: "xstate.after(doneTyping)#cheatCodeMachine.disabled.recording" };
"xstate.after(doneTyping)#cheatCodeMachine.enabled.recording": { type: "xstate.after(doneTyping)#cheatCodeMachine.enabled.recording" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "record": "keydown";
"resetTypedKeys": "" | "xstate.after(doneTyping)#cheatCodeMachine.disabled.recording" | "xstate.after(doneTyping)#cheatCodeMachine.enabled.recording";
        };
        eventsCausingDelays: {
          "doneTyping": "keydown";
        };
        eventsCausingGuards: {
          "cheatCodeEntered": "";
        };
        eventsCausingServices: {
          
        };
        matchesStates: "disabled" | "disabled.idle" | "disabled.recording" | "enabled" | "enabled.idle" | "enabled.recording" | { "disabled"?: "idle" | "recording";
"enabled"?: "idle" | "recording"; };
        tags: never;
      }
  