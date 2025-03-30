import snakify from 'snakify-ts'
import camelize from 'camelize-ts'
import EventEmitter from 'events'

import {
    CommandPayload, EventPayload,
    command, event
} from './api/protocol.ts'


/**
 * API client library session.
 */
class Session {
    ws: WebSocket
    responseCallbacks: Map<number, (response: object) => void>
    responseId: number
    event: EventEmitter

    /** @constructor */
    constructor(ws: WebSocket) {
        this.ws = ws;
        this.responseCallbacks = new Map;
        this.responseId = 0;
        this.event = new EventEmitter();
    }

    /**
     * Connects to the backend api.
     * @param {string} token - API token.
     * @param {string} api - The URL of the backend.
     */
    static async connect(token: string, api: string) {
        const session = await new Promise<Session>((res, rej) => {
            const ws = new WebSocket(api);

            ws.onopen = () => res(new Session(ws));
            ws.onclose = e => rej(e);
        });

        // Bind message listener to the WebSocket. Command responses are
        // handled with the `onmessage` handler. No command should be sent
        // before this binding.
        session.ws.onmessage = (stringPayload) => {
            const payload = camelize<EventPayload, false>(
                JSON.parse(stringPayload.data)
            );

            const d = payload.d;
            let resolver;
            switch (payload.op) {
                case event.Op.CommandResponse:
                    resolver = session
                        .responseCallbacks
                        .get((d as event.CommandResponse).responseId);

                    if (resolver) {
                        resolver((d as event.CommandResponse).response);
                        session
                            .responseCallbacks
                            .delete((d as event.CommandResponse).responseId);
                    }
                    // Classify the messages as sent and received
                    // The sent messages from UI will be sent with to the
                    // websocket betweem client and backend The received
                    // messages from backend will be sent to the websocket
                    // between the bacekend and UI
                    break;
                case event.Op.Telemetry:
                    session.event.emit(
                        'telemetry', (d as event.Telemetry).telemetry
                    );
                    break;
                default:
                    // TODO: opcode handlers
                    break;
            }
        }

        const payloadData: command.Authenticate = { token };
        const response = await session.send(
            command.Op.Authenticate,
            payloadData
        ) as { success: boolean };

        if (!response.success)
            throw false;

        return session;
    }

    /**
     * Sends the payload and awaits its response.
     * @param {command.Op} op - Opcode of the payload.
     * @param {object?} d - Payload data.
     */
    async send(op: command.Op, d?: object) {
        return await this.#sendInternal(op, true, d);
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
    ): Promise<object | null> {
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
            let resolver: (response: object) => void;

            const promise = new Promise<object>((res) => {
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
                (response: object) => {
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
}


export default Session;
