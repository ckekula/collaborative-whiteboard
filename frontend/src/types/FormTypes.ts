type UUIDGenerator = () => string;

export interface User {
  name: string;
  roomId: string;
  userId: string;
  host: boolean;
  presenter: boolean;
}

export interface RoomPageProps {
  user: User | null;
}

export interface FormProps {
  uuid: UUIDGenerator;
  socket: any;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}