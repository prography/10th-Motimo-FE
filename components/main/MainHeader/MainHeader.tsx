"useClient";
import { AppBar } from "@/components/shared";
import Banner from "@/components/shared/Banner/Banner";

interface MainHeaderProps {
  daysOfServiceUse: number;
}
const MainHeader = ({ daysOfServiceUse }: MainHeaderProps) => {
  return (
    <>
      <div className="flex justify-end w-full">
        <AppBar type="main" />
      </div>
      <Banner
        title="목표는 멀어도 나는 계속 가는 중"
        tag={`모티모와 함께 한 지 ${daysOfServiceUse}일차`}
      />
    </>
  );
};

export default MainHeader;
