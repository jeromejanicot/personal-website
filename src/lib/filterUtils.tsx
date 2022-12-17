import { useMemo } from "react";
import { SlugItemType } from "../types/types";

export function checkboxClean() {
  let checkbox = document.getElementsByTagName("input");
  for (let elem of checkbox) {
    if (elem.type === "checkbox") {
      elem.checked = false;
    }
  }
}

export function dateSorter(
  sourceArray: SlugItemType[],
  date: boolean
): SlugItemType[] {
  if (date) {
    return sourceArray.sort(
      (article1, article2) => article2.data.date - article1.data.date
    );
  } else {
    return sourceArray.sort(
      (article1, article2) => article1.data.date - article2.data.date
    );
  }
}
