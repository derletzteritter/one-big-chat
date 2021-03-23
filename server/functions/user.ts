export const users: any[] = [];

export const removeUser = (name: string) => {
  const index = users.findIndex((user) => user === name);

  if (index !== -1) return users.splice(index, 1)[0];
};
