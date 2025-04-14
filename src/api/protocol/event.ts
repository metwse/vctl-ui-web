export enum Op {
    SyncUi = 'SYNC_UI',
    Telemetry = 'TELEMETRY',
    CommandResponse = 'COMMAND_RESPONSE',
    DroneCommandResponse = 'DRONE_COMMAND_RESPONSE',
};

export interface Telemetry {
    telemetry: [[number, DroneTelemetry]],
};

export interface DroneTelemetry {
    pos: number[],
    v: number
}

export interface SyncUi {
    initialized: boolean,
    droneCount?: number,
    uiLocked: boolean,
};

export interface CommandResponse {
    response: CommandResponsePayload,
    responseId: number,
};

export interface CommandResponsePayload {
    success: boolean,
    message?: string
};

export interface DroneCommandResponse {
    response: object,
    responseId: number,
};
