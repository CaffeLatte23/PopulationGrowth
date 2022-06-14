import { defineStore } from "pinia";
import axios, { type AxiosInstance } from "axios";
import type { prefData, compositionData } from "@/types/api";
import { ref } from "vue";

const client: AxiosInstance = axios.create({
  baseURL: "https://opendata.resas-portal.go.jp/api/v1",
  headers: { "X-API-KEY": import.meta.env.VITE_API_KEY },
});

type composition = compositionData | null;

export const usePrefStore = defineStore("pref", () => {
  const compData: composition[] = Array(47).fill(null);
  const prefList = ref<prefData[]>([]);

  const getPrefNameFromCode = (code: number): string => {
    const target: prefData = prefList.value.find((element: prefData) => {
      return element.prefCode === code;
    }) ?? { prefCode: 0, prefName: "" };
    return target.prefName;
  };

  const requestPrefList = async (): Promise<void> => {
    const { data } = await client.get<{ result: prefData[] }>("/prefectures");
    prefList.value = data.result;
  };

  const getPrefComposition = async (prefCode: number): Promise<void> => {
    const { data } = await client.get<{ result: compositionData }>(
      `/population/composition/perYear?cityCode=-&prefCode=${prefCode}`
    );

    compData[prefCode - 1] = data.result;
  };

  return {
    compData,
    prefList,
    getPrefNameFromCode,
    requestPrefList,
    getPrefComposition,
  };
});

export const prefType = typeof usePrefStore;
