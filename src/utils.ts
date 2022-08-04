export const fetchData = async (path: string, urlParams: string) => {
  const res = await fetch(path + urlParams);
  const data = await res.json();

  return data;
};
