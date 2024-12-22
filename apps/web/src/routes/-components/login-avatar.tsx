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
      <div className="flex w-full justify-end p-4">
        {isAuthenticated ? (
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
