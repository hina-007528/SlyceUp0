import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const ready = () => true;
const notReady = () => false;

// Match server HTML on hydration, then enable controls only with working React.
export default function useClientReady() {
  return useSyncExternalStore(subscribe, ready, notReady);
}
