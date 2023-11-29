interface Data {
  type: string;
  id: number;
  playlist: string;
  description: string;
  image: string;
  question: string;
  options: Option[];
  user: UserData;
}

interface Option {
  id: string;
  answer: string;
}

interface UserData {
  name: string;
  avatar: string;
}

export { Data };