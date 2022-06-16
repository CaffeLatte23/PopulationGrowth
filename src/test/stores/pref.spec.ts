import { describe, it, expect, beforeEach } from "vitest";

import { usePrefStore } from "@/stores/pref";
import { setActivePinia, createPinia } from "pinia";

const DummyPrefs = [
  { prefCode: 1, prefName: "東京" },
  { prefCode: 2, prefName: "大阪" },
];

describe("test PrefStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("request prefList", async () => {
    const store = usePrefStore();
    await expect(store.prefList).toEqual([]);
  });

  it("can't find target pref from list", () => {
    const store = usePrefStore();
    const result = store.getPrefNameFromCode(1);
    expect(result).toEqual("");
  });

  it("find target pref from list", () => {
    const store = usePrefStore();
    store.prefList = DummyPrefs;

    const result = store.getPrefNameFromCode(1);
    expect(result).toEqual("東京");
  });
});
