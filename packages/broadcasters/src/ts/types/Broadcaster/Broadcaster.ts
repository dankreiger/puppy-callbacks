export type Broadcaster<TListener, TBroadcasterReturn = () => void> = (
  listener: TListener
) => TBroadcasterReturn;
