import * as droneCommand from './droneCommand.ts'


export { droneCommand };

export enum Op {
    Authenticate = 'AUTHENTICATE',
    Heartbeat = 'HEARTBEAT',
    InitializeEnvironment = 'INITIALIZE_ENVIRONMENT',
    DroneTelemetry = 'DRONE_TELEMETRY',
    UnsubscribeDroneTelemetry = 'UNSUBSCRIBE_DRONE_TELEMETRY',
    DroneControl = 'DRONE_CONTROL',
};

export interface Authenticate {
    token: string,
};

export type Heartbeat = null;

export interface InitializeEnvironment {
    droneCount: number,
    force: boolean,
};

export interface DroneTelemetry {
    drones: [number],
};

export interface UnsubscribeDroneTelemetry {
    drones: [number],
};

export interface DroneControl {
    command: droneCommand.Op,
    commandArgs?: object,
    drones: [number],
    responseId?: number,
};

export type DroneInitializeCommands = InitializeEnvironment /* If needed, add new interfaces with | in between */
