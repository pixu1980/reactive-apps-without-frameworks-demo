import { createSeedData } from "@/data/index.js";
import { store, tickState } from "../shared/index.js";

/**
 * Restores the demo to its seed state and bumps the render version.
 * @returns {void}
 */
export function resetDemo() {
  const { preferences } = store.snapshot();

  store.replace({
    ...createSeedData(),
    preferences: {
      ...preferences,
    },
  });

  tickState.set(performance.now());
}
