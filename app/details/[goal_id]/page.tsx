import { AppBar } from "@/components/shared";
import { Button } from "@/components/shared/Button/Button";
import Link from "next/link";

export default function Details() {
  return (
    <>
      <div>
        <header>
          <AppBar
            onBackClick={() => {
              console.log("뒤로가기 라우팅");
            }}
            type="back"
            title="목표 상세페이지"
          />
          <Link href={""}>
            <button className="w-12 h-8 p-2 bg-background-normal rounded inline-flex justify-center items-center gap-2">
              <p className="flex-1 text-center justify-center text-label-alternative text-xs font-semibold font-['SUIT_Variable'] leading-none">
                편집
              </p>
            </button>
          </Link>
        </header>
      </div>
    </>
  );
}
