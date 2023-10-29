import { HikingSearch } from "@/type.ts";

type findHikesType = (
  hikes: HikingSearch[],
  string: string,
) => Array<HikingSearch>;

const findHikesWithStartName: findHikesType = (hikes, string) => {
  return hikes.filter((hiking) =>
    hiking.title.toUpperCase().startsWith(string.toUpperCase()),
  );
};

const findHikesWithStartWord: findHikesType = (hikes, string) => {
  return hikes.filter((hiking) =>
    hiking.title
      .split(" ")
      .some((word) => word.toUpperCase().startsWith(string.toUpperCase())),
  );
};

const findHikesIncludeString: findHikesType = (hikes, string) => {
  return hikes.filter((hiking) =>
    hiking.title.toUpperCase().includes(string.toUpperCase()),
  );
};

export const findHikes: findHikesType = (hikes, string) => {
  if (string === "") {
    return [];
  }

  const sameStartName = findHikesWithStartName(hikes, string);

  if (sameStartName.length > 4) {
    return sameStartName.slice(0, 5);
  }

  const sameStartWord = findHikesWithStartWord(
    hikes.filter(
      (hiking) =>
        !sameStartName.some((sameStart) => sameStart.id === hiking.id),
    ),
    string,
  );

  const sameStart = sameStartName.concat(sameStartWord);

  if (sameStart.length > 4) {
    return sameStart.slice(0, 5);
  }

  const includeString = findHikesIncludeString(
    hikes.filter(
      (hiking) =>
        !sameStart.some((hikingStart) => hikingStart.id === hiking.id),
    ),
    string,
  );

  return sameStart.concat(includeString).slice(0, 5);
};
