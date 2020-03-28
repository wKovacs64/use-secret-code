export interface KeyTrackingContext {
  typedKeys: Array<string>;
}

export type KeyTrackingEvent = React.KeyboardEvent;

export type KeyTrackingState =
  | { value: 'disabled'; context: KeyTrackingContext }
  | { value: 'enabled'; context: KeyTrackingContext };
