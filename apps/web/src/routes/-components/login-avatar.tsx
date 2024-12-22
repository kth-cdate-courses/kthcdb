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
import { useSession } from "@/utilities/useSession";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogInIcon, LogOutIcon, UserIcon } from "lucide-react";

export function LoginAvatar({ className = "" }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useSession();

  function onClickAvatar() {}

  if (isLoading) return null;

  const userId = user?.id;

  return (
    <div className={className}>
      <div className="flex w-full">
        {isAuthenticated ? (
          <DropdownMenu onOpenChange={onClickAvatar}>
            <DropdownMenuTrigger className="outline-none">
              <div className="flex items-center justify-evenly md:gap-4 md:rounded-md md:border-[1px] md:bg-white md:p-2 md:px-4">
                <p className="hidden md:block">{user?.name}</p>
                <Avatar>
                  <AvatarFallback>
                    <UserIcon />
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-5 w-52">
              <DropdownMenuLabel>
                {user?.name} {user?.surname}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {userId && (
                <Link to="/accounts/$accountId" params={{ accountId: userId }}>
                  <DropdownMenuItem>
                    <UserIcon />
                    Profile
                  </DropdownMenuItem>
                </Link>
              )}
              <DropdownMenuItem onClick={() => logout()}>
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
    </div>
  );
}
