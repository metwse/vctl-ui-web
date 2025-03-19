import Session from "../api";


declare global {
    interface Window {
        session: Session;
    }
}
