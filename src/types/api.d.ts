export interface prefData {
  prefCode: number;
  prefName: string;
}

export type chartType = {
  name: string;
  data: number[];
};

export interface compositionData {
  boundaryYear: number;
  data: Array<{ label: string; data: Array<{ year: number; value: number }> }>;
}
