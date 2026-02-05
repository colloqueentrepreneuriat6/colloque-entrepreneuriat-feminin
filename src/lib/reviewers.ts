import usersData from "@/data/users.json";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export function getReviewers(): { id: string; name: string; email: string }[] {
  const users = usersData as User[];
  return users
    .filter((u) => u.role === "reviewer")
    .map((u) => ({ id: u.id, name: u.name, email: u.email }));
}
