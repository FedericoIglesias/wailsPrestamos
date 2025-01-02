export const capitalize = (str: string) => {
  if(str == " " ||str ==  "") return " "
  return str.charAt(0).toUpperCase() + str.slice(1);
};
