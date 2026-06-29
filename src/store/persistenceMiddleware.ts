import type { Middleware } from '@reduxjs/toolkit';

const NAMESPACE = 'msb';
const LEGACY_PROFILE_KEY = 'monster_slayer_builder_profile';

export const persistenceMiddleware: Middleware = (storeApi) => (next) => (action) => {
  const result = next(action);
  if (typeof window === 'undefined') return result;

  try {
    Object.entries(storeApi.getState() as Record<string, unknown>).forEach(([key, value]) => {
      localStorage.setItem(`${NAMESPACE}:${key}`, JSON.stringify(value));
    });
  } catch (error) {
    console.warn('[Persistence] Failed to write to localStorage', error);
  }

  return result;
};

export function loadSlice<T extends object>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  try {
    const raw = localStorage.getItem(`${NAMESPACE}:${key}`);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

export function loadProfileSlice<T extends object>(key: string, fallback: T): T {
  const persisted = loadSlice(key, fallback);
  if (persisted !== fallback) return persisted;

  try {
    if (typeof window === 'undefined') return fallback;
    const raw = localStorage.getItem(LEGACY_PROFILE_KEY);
    if (!raw) return fallback;
    const profile = JSON.parse(raw) as Record<string, unknown>;
    const legacySlice = {} as Partial<T>;
    Object.keys(fallback).forEach((field) => {
      if (profile[field] !== undefined) {
        legacySlice[field as keyof T] = profile[field] as T[keyof T];
      }
    });
    return { ...fallback, ...legacySlice };
  } catch {
    return fallback;
  }
}

export function loadProfileField<T extends object>(key: string, legacyField: string, fallback: T): T {
  const persisted = loadSlice(key, fallback);
  if (persisted !== fallback) return persisted;

  try {
    if (typeof window === 'undefined') return fallback;
    const raw = localStorage.getItem(LEGACY_PROFILE_KEY);
    if (!raw) return fallback;
    const profile = JSON.parse(raw) as Record<string, unknown>;
    return profile[legacyField] ? (profile[legacyField] as T) : fallback;
  } catch {
    return fallback;
  }
}
