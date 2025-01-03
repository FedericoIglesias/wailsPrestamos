export const capitalize = (str: string) => {
  let name = "";
  const listName = str.split(" ");
  for (const word of listName) {
    if (word === " ") continue;
    name += word.charAt(0).toUpperCase() + word.slice(1) + " ";
  }
  return name;
};
