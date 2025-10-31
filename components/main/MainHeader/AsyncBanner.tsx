import api from "@/api/service";
import Banner from "@/components/shared/Banner/Banner";
import { calcLeftDay } from "@/utils/calcLeftDay";
// type AsyncBannerProps = { tag: Parameters<typeof Banner>[0]["tag"] };

const AsyncBanner = async () => {
  const cheerRequest = api.응원Api.getCheerPhrase({
    next: { revalidate: 3600 * 12 },
  });

  const userRequest = api.사용자Api.getMyProfile({
    next: { revalidate: 3600 },
  });
  let cheerRes, userRes;
  try {
    const res = await Promise.allSettled([cheerRequest, userRequest] as const);
    cheerRes = res[0];
    userRes = res[1];
  } catch (e) {
    console.error("AsyncBanner hydration failed: ", e);
  }

  // const [cheerRes, userRes] = await Promise.allSettled([
  //   cheerRequest,
  //   userRequest,
  // ] as const);

  //test
  // console.log("cheerRes, userRes: ", cheerRes, userRes);

  const cheerData =
    cheerRes && cheerRes.status === "fulfilled" ? cheerRes.value : undefined;
  const userData =
    userRes && userRes.status === "fulfilled" ? userRes.value : undefined;

  const cheerPhrase = cheerData?.cheerPhrase ?? "로딩중...";
  const createdAt = userData?.createdAt;
  const daysOfServiceUse = createdAt
    ? calcLeftDay(new Date(), new Date(createdAt))
    : 0;

  return (
    <>
      <Banner
        tag={`모티모와 함께 한 지 ${daysOfServiceUse}일차`}
        title={cheerPhrase ?? ""}
      />
    </>
  );
};

export default AsyncBanner;
