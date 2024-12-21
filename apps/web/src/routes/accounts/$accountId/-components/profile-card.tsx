import { UserDto } from "$api/routes/user/user-dto";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

export function ProfileCard({ userData }: { userData: UserDto }) {
  return (
    <Card className="mx-4 flex h-[80vh] w-3/12 flex-col justify-between">
      <CardHeader className="flex items-center gap-4">
        <img
          className="h-[160px] w-[160px] self-center rounded-full"
          alt="User profile picture"
          src="/favicon.ico"
        />
        <div className="flex flex-col items-center">
          <p className="text-xl">
            {userData.name} {userData.surname}
          </p>
          <p className="relative top-0 text-sm">
            Member since{" "}
            {new Date(userData.userCreatedDate).toLocaleDateString("en-GB", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <p className="rounded-sm border-[1px] border-zinc-200 bg-zinc-50 p-2 text-base">
          Autem quia est excepturi rerum quae aut. Omnis voluptatum cum
          voluptatem illo asperiores. Nihil consequatur quas eveniet mollitia ut
          dolorum. Explicabo ab repellat at velit. Qui porro porro et est
          eligendi et. At repellendus voluptatem ullam sint praesentium.
        </p>
      </CardHeader>
      <CardFooter>
        <Button className="w-full bg-[rgb(0,0,97)]">Log out</Button>
      </CardFooter>
    </Card>
  );
}
