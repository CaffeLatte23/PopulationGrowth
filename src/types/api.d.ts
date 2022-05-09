export interface prefData {
  prefCode: number;
  prefName: string;
}

type chartType = {
  name: string;
  data: number[];
};

interface compositionData {
  boundaryYear: number;
  data: Array<{ label: string; data: Array<{ year: number; value: number }> }>;
}
