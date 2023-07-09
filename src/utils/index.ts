export const sum = (a: number, b: number) => {
  return a + b;
};

export const makeObject = (name: string, age: number) => {
  return {
    name,
    age,
  };
};

export const calculateAge = (birthDate: Date) => {
  const toDate = new Date();
  return toDate.getFullYear() - birthDate.getFullYear();
};
