import { UserDto } from "$api/routes/user/user-dto";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useSession } from "@/utilities/useSession";

export function ProfileCard({ userData }: { userData: UserDto }) {
  const { logout } = useSession();
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center pb-4 pt-12">
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
      <CardFooter className="pt-0">
        {" "}
        <Button className="w-full" onClick={logout}>
          Log out
        </Button>
      </CardFooter>
    </Card>
  );
}
