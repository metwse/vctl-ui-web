import * as command from './protocol/command.ts';
import * as event from './protocol/event.ts';


export interface CommandPayload {
    op: command.Op,
    d?: object,
    responseId?: number,
};

export interface EventPayload {
    op: event.Op,
    d?: object,
};

export { command, event };
