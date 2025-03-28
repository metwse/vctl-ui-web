export enum Op {
    Arm = 'ARM',
    Disarm = 'DISARM',
    Emergency = 'EMERGENCY',
    Takeoff = 'TAKEOFF',
    Land = 'LAND',
    Track = 'TRACK',
    Move = 'MOVE',
};

export interface Arm {
    force?: boolean,
};

export interface Disarm {
    force?: boolean,
};

export type Emergency = null;

export interface Takeoff {
    altitude: number,
};

export type Land = null;

export type Track = null;

export interface Move {
    x: number,
    y: number,
    z: number,
    v: number,
};

export type DroneMovementCommands = Arm | Disarm | Emergency | Takeoff | Land | Track | Move
