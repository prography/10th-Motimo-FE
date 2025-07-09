import { CheerPhraseRs } from "@/api/generated/motimo/Api";
import { templateFetch } from "./template/fetchTemplate";

const getCheerComment = async () => {
  // error처리 아직 안함. toast처리 해야 함
  const result = await templateFetch<CheerPhraseRs>(`/v1/cheers`, "GET");

  // 타입 변환 해야할 수도
  return result;
};

export { getCheerComment };
