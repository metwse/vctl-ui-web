import Session from '../api.ts';


declare global {
    interface Window {
        session: Session;
    }
}
