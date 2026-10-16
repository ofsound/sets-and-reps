import assert from "node:assert/strict";
import test from "node:test";
import {
  createRestTimerState,
  restTimerReducer,
} from "../src/utils/restTimer.ts";

test("existing set history initializes the timer on first launch", () => {
  const state = restTimerReducer(createRestTimerState(null), {
    type: "initialize",
    date: 1000,
  });
  assert.equal(state.lastSetLoggedAt, 1000);
});

test("editing or deleting history does not change an active timer", () => {
  const state = createRestTimerState("1000");
  for (const date of [1000, 2000, 500, null]) {
    assert.equal(restTimerReducer(state, { type: "initialize", date }), state);
  }
});

test("a stale database snapshot cannot roll back a newly logged set", () => {
  const state = restTimerReducer(createRestTimerState(null), {
    type: "setLogged",
    date: 2000,
  });
  assert.equal(
    restTimerReducer(state, { type: "initialize", date: 1000 }).lastSetLoggedAt,
    2000,
  );
});

test("each new logged set restarts the timer", () => {
  const state = restTimerReducer(createRestTimerState("1000"), {
    type: "setLogged",
    date: 2000,
  });
  assert.equal(state.lastSetLoggedAt, 2000);
});

test("reload restores the saved timer independently of modified history", () => {
  const restored = createRestTimerState("2000");
  assert.equal(
    restTimerReducer(restored, { type: "initialize", date: 500 })
      .lastSetLoggedAt,
    2000,
  );
});

test("invalid saved timestamps allow initialization from history", () => {
  for (const value of [
    null,
    "",
    "broken",
    "NaN",
    "Infinity",
    "-1",
    "0",
    String(Date.now() + 60000),
  ]) {
    assert.deepEqual(createRestTimerState(value), {
      lastSetLoggedAt: null,
      initialized: false,
    });
  }
});

test("an empty workout history keeps the timer hidden until a set is logged", () => {
  const empty = restTimerReducer(createRestTimerState(null), {
    type: "initialize",
    date: null,
  });
  assert.equal(empty.lastSetLoggedAt, null);
  assert.equal(
    restTimerReducer(empty, { type: "setLogged", date: 1000 }).lastSetLoggedAt,
    1000,
  );
});
