export const getServiceSlug = (path: string) => {
  return path.split("/").pop()?.replace(".json", "") || "";
};
    