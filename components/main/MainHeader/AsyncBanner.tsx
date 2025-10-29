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
  const [cheerRes, userRes] = await Promise.allSettled([
    cheerRequest,
    userRequest,
  ] as const);

  //test
  // console.log("cheerRes, userRes: ", cheerRes, userRes);

  const cheerData =
    cheerRes.status === "fulfilled" ? cheerRes.value : undefined;
  const userData = userRes.status === "fulfilled" ? userRes.value : undefined;

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
