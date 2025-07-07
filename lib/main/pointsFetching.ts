import { PointRs } from "@/api/generated/motimo/Api";
import { templateFetch } from "../common/fetchTemplate";

const getPoints = async () => {
  // error처리 아직 안함. toast처리 해야 함
  const result = await templateFetch<PointRs>(`/v1/points`, "GET");

  // 타입 변환 해야할 수도
  return result;
};

export { getPoints };
