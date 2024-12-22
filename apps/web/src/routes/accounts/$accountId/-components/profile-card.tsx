import { UserDto } from "$api/routes/user/user-dto";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function ProfileCard({ userData }: { userData: UserDto }) {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center pt-12">
        <p className="mx-auto text-3xl">
          {userData.name} {userData.surname}
        </p>
        <p className="relative top-0 pb-0 text-base">
          Member since{" "}
          {new Date(userData.userCreatedDate).toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </CardContent>
    </Card>
  );
}
