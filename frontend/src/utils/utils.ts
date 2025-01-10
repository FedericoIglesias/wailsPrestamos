export const capitalize = (str: string) => {
  let name = "";
  const listName = str.split(" ");
  for (const word of listName) {
    if (word === " ") continue;
    name += word.charAt(0).toUpperCase() + word.slice(1) + " ";
  }
  return name;
};

export const checkLong = (str: string) => {
  if (str.length > 10) {
    return str.substring(0, 10) + "...";
  }
  return str;
};
