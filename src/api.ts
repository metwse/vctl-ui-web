import snakify from 'snakify-ts'
import camelize from 'camelize-ts'
import EventEmitter from 'events'

import {
    CommandPayload, EventPayload,
    command, event
} from './api/protocol.ts'
import { droneCommand } from './api/protocol/command.ts'
import { CommandResponsePayload } from './api/protocol/event.ts'

/**
 * API client library session.
 */
class Session {
    ws: WebSocket
    responseCallbacks: Map<
        number,
        (response: CommandResponsePayload) => void
    >
    responseId: number
    event: EventEmitter
    droneCount?: number
    isInitialized: boolean
    /**
     * Whether or not the back end is locked. Usually, back end is locked
     * during the environment initialization to prevent data races.
     */
    isLocked: boolean
    isAuthenticated: boolean

    /** @constructor */
    constructor(ws: WebSocket) {
        this.ws = ws;
        this.responseCallbacks = new Map;
        this.responseId = 0;
        this.event = new EventEmitter();
        this.isInitialized = false;
        this.isLocked = true;
        this.isAuthenticated = false;
    }

    /**
     * Connects to the backend API.
     * @param {string} api - The URL of the backend.
     */
    static async connect(api: string) {
        const session = await new Promise<Session>((res, rej) => {
            const ws = new WebSocket(api);

            ws.onopen = () => res(new Session(ws));
            ws.onclose = e => rej(e);
        });

        return session
    }

    /**
     * Authenticates the WebSockets, registers event listeners.
     * @param {string} token - API token.
     */
    async authenticate(token: string) {
        if (this.isAuthenticated)
            return;
        this.isAuthenticated = true;

        // Bind message listener to the WebSocket. Command responses are
        // handled with the `onmessage` handler. No command should be sent
        // before this binding.
        this.ws.onmessage = (stringPayload) => {
            const payload = camelize<EventPayload, false>(
                JSON.parse(stringPayload.data)
            );

            this.#handleEventPayload(payload.op, payload.d)
        }

        const payloadData: command.Authenticate = { token };
        const response = await this.send(
            command.Op.Authenticate,
            payloadData
        );

        if (!response.success)
            this.ws.close();

        const heartbeat = () => {
            this.sendNoRes(command.Op.Heartbeat);
            setTimeout(heartbeat, 10_000);
        }
        heartbeat();
    }

    /**
     * Locks the session.
     */
    lock() {
        this.isLocked = true;
        this.#emitSyncUi();
    }

    /**
     * Unlocks the session.
     */
    unlock() {
        this.isLocked = false;
        this.#emitSyncUi();
    }

    #emitSyncUi() {
        this.event.emit(event.Op.SyncUi, {
            initialized: this.isInitialized,
            droneCount: this.droneCount,
            uiLocked: this.isLocked
        });
    }

    /**
     * Sends the payload and awaits its response.
     * @param {command.Op} op - Opcode of the payload.
     * @param {object?} d - Payload data.
     */
    async send(op: command.Op, d?: object) {
        return (await this.#sendInternal(op, true, d))!;
    }

    sendDroneCommand(
        droneCommand: droneCommand.Op, drones: number[] | 'all',
        commandArgs?: object
    ) {
        const payload: command.DroneControl = {
            command: droneCommand,
            commandArgs,
            drones,
        }

        return this.send(command.Op.DroneControl, payload)
    }


    /**
     * Sends the payload, not awaiting its response.
     * @param {command.Op} op - Opcode of the payload.
     * @param {object?} d - Payload data.
     */
    sendNoRes(op: command.Op, d?: object) {
         this.#sendInternal(op, false, d);
    }

    async #sendInternal(
        op: command.Op,
        awaitResponse: boolean,
        d?: object,
    ): Promise<CommandResponsePayload | null> {
        // A response id is provided to the server if await response set to
        // true.
        const responseId = awaitResponse ? this.responseId++ : undefined;

        const payload: CommandPayload = {
            op, d, responseId
        };

        const stringPayload = JSON.stringify(
            snakify(payload)
        );

        this.ws.send(stringPayload);

        if (responseId !== undefined) {
            let resolver: (response: CommandResponsePayload) => void;

            const promise = new Promise<CommandResponsePayload>((res) => {
                // Exposing `res` to the upper scope.
                resolver = res;
            });

            // Since the `resolver` variable is set after the callback is
            // assigned, it is necessary to check if the resolver is set to a
            // Promise resolver. Having a WebSocket response that is faster
            // than a few lines of initialization code is practically
            // impossible, but this check ensures the code behaves correctly
            // under any condition.
            this.responseCallbacks.set(
                responseId,
                // Pushes resolver into the callback list.
                (response: CommandResponsePayload) => {
                    const tryResolverInitialization = () => {
                        if (!resolver)
                            setTimeout(tryResolverInitialization, 1);
                        else
                            resolver(response);
                    };
                    tryResolverInitialization();
                }
            );

            return await promise;
        } else
            return null;
    }

    #handleEventPayload(op: event.Op, d?: object) {
        if (op == event.Op.CommandResponse) {
            const data = d as event.CommandResponse;
            const resolver = this
                .responseCallbacks
                .get(data.responseId);

            if (resolver) {
                resolver(data.response);
                this
                    .responseCallbacks
                    .delete(data.responseId);
            }
        }

        if (op == event.Op.SyncUi) {
            const data = d as event.SyncUi;

            this.droneCount = data.droneCount ? data.droneCount : undefined;
            this.isInitialized = data.initialized;
            this.isLocked = data.uiLocked;
        }

        this.event.emit(op, d);
        this.event.emit('EVENT_PAYLOAD', { op, d });
    }
}


export default Session;
