import { User } from "./User";
type UUIDGenerator = () => string;

export interface RoomPageProps {
  user: User | null;
}

export interface FormProps {
  uuid: UUIDGenerator;
  socket: any;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}