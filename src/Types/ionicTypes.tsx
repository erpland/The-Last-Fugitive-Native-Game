export interface InputKeyUpEvent extends CustomEvent {
  key:string
  target: HTMLIonInputElement;
  detail: InputChangeEventDetail;
}
interface InputChangeEventDetail {
  value: string | undefined | null;
}