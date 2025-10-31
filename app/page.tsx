// "use client";
import { unstable_serialize } from "swr";
import api, { popTokens } from "@/api/service";
import Main, { FallbackProvider } from "./Main";
import { queryArgs } from "@/api/queries";
import ServerAuthGuard from "./_components/ServerAuthGuard";
import { BottomTabBar } from "@/components/shared";
import Banner from "@/components/shared/Banner/Banner";
import AsyncBanner from "@/components/main/MainHeader/AsyncBanner";
import { UserRs } from "@/api/generated/motimo/Api";
// import AsyncGoalDataSpreader from "@/components/main/GoalDataContainer/AsyncGoalDataContainer";

// import dynamic from "next/dynamic";
// import GoalMenuContainer from "@/components/main/GoalMenuContainer/GoalMenuContainer";
// import GoalCard from "@/components/main/GoalCard/GoalCard";
// import MainHeader from "@/components/main/MainHeader/MainHeader";
// import { BottomTabBar } from "@/components/shared/BottomTabBar/BottomTabBar";
// import { useMyProfile } from "@/api/hooks";
// import { calcLeftDay } from "@/utils/calcLeftDay";
// import GoalDataContainer from "@/components/main/GoalDataContainer/GoalDataContainer";

// AuthGuard는 클라이언트에서만 렌더링 (localStorage 접근 필요)
// const AuthGuard = dynamic(() => import("./_components/AuthGuard"), {
//   ssr: false,
// });

// export default function Main() {
//   const { data } = useMyProfile();
//   const tmpDaysOfServiceUse = data?.createdAt
//     ? calcLeftDay(new Date(), new Date(data.createdAt))
//     : 0;

//   return (
//     <AuthGuard>
//       <section className="w-full h-full ">
//         <div
//           data-icon="false"
//           data-type="main"
//           className="w-full h-full min-h-screen pb-14 relative bg-white inline-flex flex-col flex-1 justify-start  gap-1"
//         >
//           <MainHeader daysOfServiceUse={tmpDaysOfServiceUse} />
//           <GoalMenuContainer />
//           {/* <GoalCard /> */}
//           <GoalDataContainer />
//         </div>
//       </section>
//       <BottomTabBar className="fixed z-40 bottom-0" type="1" />
//     </AuthGuard>
//   );
// }

export default async function MainPage() {
  // const initUserData = await api.사용자Api.getMyProfile();
  // const initCheerData = await api.응원Api.getCheerPhrase();
  // const initPointData = await api.포인트Api.getPoint();
  // const initGoalsData = await api.목표Api.getGoalList();

  // const profileKey = JSON.stringify(queryArgs.myProfile);
  // const cheerKey = JSON.stringify(queryArgs.cheerPhrase);
  // const pointKey = JSON.stringify(queryArgs.points);
  // const goalsKey = JSON.stringify(queryArgs.goals);

  // //test
  // console.log(
  //   "initdatas: ",
  //   initUserData,
  //   initCheerData,
  //   initPointData,
  //   initGoalsData,
  // );

  // const { data: cheerData } = useCheerPhrase();
  //   const { data: pointData } = usePoints();
  //   const { data: rawGoalData, mutate } = useGoals();
  return (
    <>
      {/* <FallbackProvider
        fallback={{
          [profileKey]: initUserData,
          [cheerKey]: initCheerData,
          [pointKey]: initPointData,
          [goalsKey]: initGoalsData,
        }}
      >
        <Main />
      </FallbackProvider> */}
      <ServerAuthGuard>
        <MainHydration />
      </ServerAuthGuard>
    </>
  );
}

const MainHydration = async () => {
  const userRequest = api.사용자Api.getMyProfile();
  // const cheerRequest = api.응원Api.getCheerPhrase({
  //   next: { revalidate: 3600 * 12 },
  // });
  const pointRequest = api.포인트Api.getPoint();
  const goalsRequest = api.목표Api.getGoalList();

  const profileKey = unstable_serialize(queryArgs.myProfile().slice(0, 2));
  const cheerKey = unstable_serialize(queryArgs.cheerPhrase().slice(0, 2));
  const pointKey = unstable_serialize(queryArgs.points().slice(0, 2));
  const goalsKey = unstable_serialize(queryArgs.goals().slice(0, 2));

  const keyList = [profileKey, cheerKey, pointKey, goalsKey];

  let initData = await Promise.allSettled([
    userRequest,
    // cheerRequest,
    pointRequest,
    goalsRequest,
  ])
    .then((result) => {
      return result.map((eachRes) => {
        // return eachRes;
        if (eachRes.status === "fulfilled") {
          // return Object.keys(eachRes.value).reduce((acc, key) => {
          //   if (key === "newTokens") return acc;
          //   return { ...acc, [key]: eachRes.value[key] };
          // }, {});
          // type optionalResVal = typeof eachRes.value &
          //   (
          //     | undefined
          //     | {
          //         newTokens: tokens;
          //       }
          //   );

          // if ((eachRes.value as optionalResVal)?.newTokens) {
          //   const { newTokens, ...remain } = eachRes.value as optionalResVal;
          //   reissuedTokens = newTokens || undefined;
          //   return remain;
          // }
          return eachRes.value;
        }
        console.error(eachRes);
        return undefined;
      });
    })
    .catch((e) => {
      console.error("root hydration failed: ", e);
      return undefined;
    });
  // const initData = await Promise.allSettled([
  //   userRequest,
  //   // cheerRequest,
  //   pointRequest,
  //   goalsRequest,
  // ]).then((result) => {
  //   return result.map((eachRes) => {
  //     // return eachRes;
  //     if (eachRes.status === "fulfilled") return eachRes.value;
  //     console.error(eachRes);
  //     return undefined;
  //   });
  // });
  const fallback: Record<string, NonNullable<typeof initData>[number]> =
    initData
      ? initData.reduce(
          (acc, initRes, idx) => {
            if (!initRes) return acc;
            return { ...acc, [keyList[idx]]: initRes };
          },
          {} as Record<string, (typeof initData)[number]>,
        )
      : {};

  const reissuedTokens = popTokens();
  return (
    <>
      <FallbackProvider fallback={fallback}>
        <Main reissuedTokens={reissuedTokens}>
          <AsyncBanner />
        </Main>
        {/* <section className="w-full h-full ">
          <div
            data-icon="false"
            data-type="main"
            className="w-full h-full min-h-screen pb-14 relative bg-white inline-flex flex-col flex-1 justify-start  gap-1"
          >
            <MainHeader daysOfServiceUse={tmpDaysOfServiceUse} />
            <Main />
          </div>
        </section>
        <BottomTabBar className="fixed z-40 bottom-0" type="1" /> */}
      </FallbackProvider>
    </>
  );
};
