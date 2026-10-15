import type { BikeShareNetwork, BikeShareStation } from '../types/bike-share';

export const BIKE_SHARE_URL = 'https://api.citybik.es/v2/networks/mobibikes';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function count(value: unknown): number | null {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 ? value : null;
}

/** Treat remote JSON as unknown; unavailable counts must never become zero. */
export function parseBikeShare(payload: unknown): BikeShareNetwork {
  if (!isRecord(payload) || !isRecord(payload.network) || !Array.isArray(payload.network.stations)) {
    throw new Error('Unexpected bike-share response');
  }
  const network = payload.network;
  const stations: BikeShareStation[] = [];
  for (const station of network.stations as unknown[]) {
    if (!isRecord(station) || typeof station.id !== 'string' || typeof station.name !== 'string') continue;
    const updatedAt = typeof station.timestamp === 'string' && Number.isFinite(Date.parse(station.timestamp))
      ? station.timestamp : null;
    stations.push({
      id: station.id, name: station.name,
      availableBikes: count(station.free_bikes), emptyDocks: count(station.empty_slots), updatedAt,
    });
  }
  return {
    name: typeof network.name === 'string' ? network.name : 'Mobi',
    city: isRecord(network.location) && typeof network.location.city === 'string' ? network.location.city : 'Vancouver',
    stations: stations.sort((a, b) => a.name.localeCompare(b.name)).slice(0, 3),
  };
}

export async function fetchBikeShare(signal: AbortSignal): Promise<BikeShareNetwork> {
  const response = await fetch(BIKE_SHARE_URL, { signal });
  if (!response.ok) throw new Error(`Bike-share request failed (${response.status})`);
  return parseBikeShare(await response.json());
}
