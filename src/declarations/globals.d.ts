import Session from '../api.ts';


declare global {
    interface Window {
        session: Session;
        // 1rem in px
        rem: number
    }
}
