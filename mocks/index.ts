// Track MSW state to prevent redundant operations
let mswState = {
  isInitialized: false,
  isRunning: false,
};

export async function initMsw() {
  if (mswState.isInitialized && mswState.isRunning) {
    console.log("MSW already running, skipping initialization");
    return;
  }

  if (typeof window === "undefined") {
    const { server } = await import("../mocks/server");
    if (!mswState.isRunning) {
      server.listen();
      mswState.isRunning = true;
    }
  } else {
    const { worker } = await import("../mocks/browser");
    if (!mswState.isRunning) {
      await worker.start();
      mswState.isRunning = true;
    }
  }
  mswState.isInitialized = true;
}

export async function stopMsw() {
  if (!mswState.isRunning) {
    console.log("MSW not running, skipping stop");
    return;
  }

  if (typeof window === "undefined") {
    const { server } = await import("../mocks/server");
    server.close();
  } else {
    const { worker } = await import("../mocks/browser");
    worker.stop();
  }

  mswState.isRunning = false;
}

export function getMswState() {
  return { ...mswState };
}

// export async function closeMSW() {
//   if (typeof window === "undefined") {
//     const { server } = await import("../mocks/server");
//     server.close();
//   } else {
//     const { worker } = await import("../mocks/browser");
//     worker.stop();
//   }
// }
