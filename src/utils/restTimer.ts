export type RestTimerState = {
  lastSetLoggedAt: number | null;
  initialized: boolean;
};

type RestTimerAction = {
  type: "initialize" | "setLogged";
  date: number | null;
};

export const REST_TIMER_STORAGE_KEY = "sets-and-reps:last-set-logged-at";

export function createRestTimerState(
  storedDate: string | null,
): RestTimerState {
  const date = storedDate === null ? NaN : Number(storedDate);
  const valid = Number.isFinite(date) && date > 0 && date <= Date.now();
  return {
    lastSetLoggedAt: valid ? date : null,
    initialized: valid,
  };
}

export function restTimerReducer(
  state: RestTimerState,
  action: RestTimerAction,
): RestTimerState {
  // History supplies a starting point only once. Edits and deletions must not
  // change an active timer, including while a newly logged set is still saving.
  if (action.type === "initialize" && state.initialized) return state;

  return { lastSetLoggedAt: action.date, initialized: true };
}
