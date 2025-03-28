export enum Op {
    EnvironmentStatus = 'ENVIRONMENT_STATUS',
    Telemetry = 'TELEMETRY',
    CommandResponse = 'COMMAND_RESPONSE',
    DroneCommandResponse = 'DRONE_COMMAND_RESPONSE',
};

export interface Telemetry {
    telemetry: [[number, DroneTelemetry]],
};

export interface DroneTelemetry {
    //! redundant telemetry_ prefix, use position and velocity directly
    telemetry_position: [number, number, number],
    telemetry_velocity: [number, number, number]
}

export interface EnvironmentStatus {
    initialized: boolean,
    droneCount?: number,
};

export interface CommandResponse {
    response: object,
    responseId: number,
};

export interface DroneCommandResponse {
    response: object,
    responseId: number,
};
