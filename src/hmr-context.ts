export default async function main(
  moduleSrcStore: string[],
  changes?: string[]
) {
  Promise.all(
    window.moduleSrcStore.map(
      (src) => import(changes?.includes(src) ? src + `?t=${Date.now()}` : src)
    )
  )
    .then(() => {
      dispatchEvent(new Event("load"));
    })
    .catch((reason) =>
      console.error(`[T-server] error reloading modules, reason: ${reason}`)
    );

  console.log("reload complete");
}
window.addEventListener("DOMContentLoaded", async () => {
  await main(window.moduleSrcStore);
});
