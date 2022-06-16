import { describe, it, expect, vi } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import AppVue from "@/App.vue";

import { usePrefStore } from "@/stores/pref";
import { createTestingPinia } from "@pinia/testing";

describe("test App.vue", () => {
  it("Init Request", () => {
    shallowMount(AppVue, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });
    const store = usePrefStore();
    expect(store.requestPrefList).toHaveBeenCalled();
  });

  it("pref list input work test", async () => {
    const wrapper = await mount(AppVue, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              pref: {
                prefList: [{ prefCode: 1, prefName: "東京" }],
              },
            },
          }),
        ],
        stubs: {
          chart: {
            template: `<span />`,
          },
        },
      },
    });

    const element = await wrapper.find("input");
    expect(element.exists()).toBe(true);
  });
});
