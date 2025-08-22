export async function initMsw() {
  if (typeof window === "undefined") {
    const { server } = await import("../mocks/server");
    server.listen();
  } else {
    const { worker } = await import("../mocks/browser");
    await worker.start();
  }
}

export async function closeMSW() {
  if (typeof window === "undefined") {
    const { server } = await import("../mocks/server");
    server.close();
  } else {
    const { worker } = await import("../mocks/browser");
    worker.stop();
  }
}
