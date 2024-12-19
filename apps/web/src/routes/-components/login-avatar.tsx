import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogInIcon, LogOutIcon, UserIcon } from "lucide-react";
import { useSession } from "@/utilities/useSession";
import { useNavigate } from "@tanstack/react-router";

export function LoginAvatar() {
  const navigate = useNavigate();
  const { data, isLoading } = useSession();
  const isAuthorized = data?.data?.authenticated;

  function onClickAvatar() {}

  if (isLoading) return null;

  return (
    <div className="absolute flex w-full justify-end p-4">
      {isAuthorized ? (
        <DropdownMenu onOpenChange={onClickAvatar}>
          <DropdownMenuTrigger className="outline-none">
            <Avatar>
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-5 w-52">
            <DropdownMenuLabel className="capitalize">
              {data.data?.user?.name} {data.data?.user?.surname}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOutIcon /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => navigate({ to: "/signin" })}>
          <LogInIcon /> Log in
        </Button>
      )}
    </div>
  );
}
