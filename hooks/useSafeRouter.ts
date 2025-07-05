import { useRouter } from "next/navigation";

// Hook to safely use Next.js router in Storybook
export const useSafeRouter = () => {
    try {
        return useRouter();
    } catch (error) {
        // Return a mock router for Storybook
        return {
            back: () => console.log("Back button clicked (Storybook)"),
            push: (url: string) => console.log("Navigate to:", url),
            replace: (url: string) => console.log("Replace with:", url),
            refresh: () => console.log("Refresh (Storybook)"),
            prefetch: (url: string) => console.log("Prefetch:", url),
            forward: () => console.log("Forward (Storybook)"),
        };
    }
}; 