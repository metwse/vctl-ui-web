import Session from '../api.ts';


export interface TabArgs {
    ref: (ref: HTMLElement) => void,
    session: Session,
}
