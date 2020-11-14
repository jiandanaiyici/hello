export interface DetailData {
  id: string;
  name: string;
  age: number;
  address: string;
}

export const list = Array(5)
  .fill(1)
  .map((_, idx) => ({
    id: `${idx}`,
    name: `${idx}-name`,
    age: idx ** 3,
    address: `${idx}**address`,
  }));
