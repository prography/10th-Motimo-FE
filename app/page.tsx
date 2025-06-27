import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <main className="flex flex-col gap-8 items-center text-center w-full">
        <div>
          <h1 className="text-[32px] font-bold mb-4 text-label-strong">MOTIMO</h1>
          <p className="text-base text-label-alternative mb-8">목표 달성을 위한 온보딩 시스템</p>
        </div>

        <ol className="list-inside list-decimal text-sm text-label-normal space-y-2 text-left w-full max-w-[280px]">
          <li>
            온보딩 플로우를 통해 사용자의 목표를 설정합니다.
          </li>
          <li>
            개월 수 또는 특정 날짜를 선택하여 목표 기간을 정할 수 있습니다.
          </li>
        </ol>

        <div className="flex flex-col gap-3 w-full max-w-[280px]">
          <Link
            href="/onboarding"
            className="rounded-[16px] bg-label-strong text-white flex items-center justify-center h-[52px] px-5 text-base font-medium hover:bg-opacity-90 transition-opacity"
          >
            온보딩 시작하기
          </Link>
          <a
            className="rounded-[16px] border border-border-default text-label-normal flex items-center justify-center h-[52px] px-5 text-base font-medium hover:bg-background-alternative transition-colors"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      
      <footer className="flex gap-6 flex-wrap items-center justify-center mt-auto pb-6 text-xs text-label-alternative">
        <a
          className="flex items-center gap-2 hover:text-label-normal transition-colors"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:text-label-normal transition-colors"
          href="https://vercel.com/templates"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:text-label-normal transition-colors"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
