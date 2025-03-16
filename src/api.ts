import WebSocket from 'ws';


class Session {
    token: string 
    ws: WebSocket

    /** @constructor */
    constructor(token: string, ws: WebSocket) {
        this.token = token;
        this.ws = ws;
    }

    /**
     * Connects to the backend api.
     * @param {string} token - API token.
     * @param {string} api - The URL of the backend.
     */
    async connect(token: string, api: string) {
        const session = await new Promise<Session>((res, rej) => {
            const ws = new WebSocket(api);

            ws.onopen = () => res(new Session(token, ws));
            ws.onclose = e => rej(e);
        });

        // TODO: Send Authenticate payload

        return session;
    }
}


export default Session;
