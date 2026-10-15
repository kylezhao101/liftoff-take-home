import { useCallback, useEffect, useState } from 'react';

import { fetchBikeShare } from '../services/bike-share';
import type { BikeShareNetwork } from '../types/bike-share';

type BikeShareState =
  | { status: 'idle' | 'loading' }
  | { status: 'success'; data: BikeShareNetwork }
  | { status: 'error'; message: string };

export function useBikeShare(enabled: boolean) {
  const [result, setResult] = useState<{ request: number; state: BikeShareState }>({ request: -1, state: { status: 'idle' } });
  const [request, setRequest] = useState(0);
  const retry = useCallback(() => setRequest(value => value + 1), []);

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    let active = true;
    let timedOut = false;
    const timeout = setTimeout(() => { timedOut = true; controller.abort(); }, 15000);
    fetchBikeShare(controller.signal)
      .then(data => { if (active) setResult({ request, state: { status: 'success', data } }); })
      .catch(() => {
        if (active) setResult({ request, state: { status: 'error', message: timedOut
          ? 'Bike-share data took too long to load. Please try again.'
          : 'Bike-share data is unavailable. Check your connection and try again.' } });
      })
      .finally(() => clearTimeout(timeout));
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, [enabled, request]);

  const state: BikeShareState = !enabled ? { status: 'idle' }
    : result.request !== request ? { status: 'loading' } : result.state;
  return { state, retry };
}
