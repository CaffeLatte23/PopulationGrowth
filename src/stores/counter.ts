import { defineStore } from "pinia";
import axios from "axios";
import type { prefData } from "@/types/api";

export const usePrefStore = defineStore({
  id: "pref",
  state: () => ({
    compData: Array(47).fill(null),
    prefList: [],
  }),
  getters: {
    getPrefNameFromCode: (state) => (code: number) => {
      const target: prefData = state.prefList.find((element: prefData) => {
        return element.prefCode === code;
      }) ?? { prefCode: 0, prefName: "" };
      return target.prefName;
    },
  },
  actions: {
    async requestPrefList() {
      await axios
        .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
          headers: { "X-API-KEY": import.meta.env.VITE_API_KEY },
        })
        .then(({ data }) => {
          this.prefList = data.result;
        });
    },
    async getPrefComposition(prefCode: number) {
      await axios
        .get(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
          { headers: { "X-API-KEY": import.meta.env.VITE_API_KEY } }
        )
        .then(({ data }) => {
          this.compData[prefCode - 1] = data.result;
        });
    },
  },
});
