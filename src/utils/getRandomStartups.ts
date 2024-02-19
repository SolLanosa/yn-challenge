export const generateRandomStartup = () => {
  const categories = ["bio", "internet", "environment"];
  const industry = categories[Math.trunc(Math.random() * categories.length)];

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let name = "ynd_";

  for (let i = 0; i < 13; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    name += characters.charAt(randomIndex);
  }

  return { name, industry };
};

export const generateRandomStartupArray = () => {
  const randomTimes = Math.floor(Math.random() * 10) + 1;

  let startupsAssigned = new Array(randomTimes)
    .fill("")
    .map(() => generateRandomStartup());

  return startupsAssigned;
};
