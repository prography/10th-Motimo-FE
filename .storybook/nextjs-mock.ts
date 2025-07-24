// Mock Next.js App Router navigation for Storybook
const mockRouter = {
  push: (url: string) => {
    console.log("Router.push called with:", url);
  },
  replace: (url: string) => {
    console.log("Router.replace called with:", url);
  },
  back: () => {
    console.log("Router.back called");
  },
  forward: () => {
    console.log("Router.forward called");
  },
  refresh: () => {
    console.log("Router.refresh called");
  },
  prefetch: (url: string) => {
    console.log("Router.prefetch called with:", url);
  },
};

// Export the functions that next/navigation provides
export const useRouter = () => mockRouter;

export const useSearchParams = () => new URLSearchParams();

export const usePathname = () => "/";

export const useParams = () => ({});

export const notFound = () => {
  console.log("notFound called");
};

export const redirect = (url: string) => {
  console.log("redirect called with:", url);
};

// For backward compatibility
export default {
  useRouter,
  useSearchParams,
  usePathname,
  useParams,
  notFound,
  redirect,
};
