export enum Op {
    EnvironmentStatus = 'ENVIRONMENT_STATUS',
    Telemetry = 'TELEMETRY',
    CommandResponse = 'COMMAND_RESPONSE',
    DroneCommandResponse = 'DRONE_COMMAND_RESPONSE',
};

export interface Telemetry {
    // TODO: Telemetry type
    telemetry: object,
};

export interface EnvironmentStatus {
    initialized: boolean,
    droneCount?: number,
};

export interface CommandResponse {
    response: string,
    responseId: number,
};

export interface DroneCommandResponse {
    response: string,
    responseId: number,
};
