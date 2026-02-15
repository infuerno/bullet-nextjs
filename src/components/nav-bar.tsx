import { UserButton } from "@stackframe/stack";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { stackServerApp } from "@/stack/server";

export async function NavBar() {
  const user = await stackServerApp.getUser();

  return (
    <nav className="w-full flex items-center justify-between px-4 py-2 border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50 gap-20">
      <Link href="/" className="text-lg font-bold">
        Bullet Journal
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-4">
          <NavigationMenuItem>
            <Button asChild variant="ghost">
              <Link href="/inbox">Inbox</Link>
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button asChild variant="ghost">
              <Link href={`/day/${format(new Date(), "yyyy-MM-dd")}`}>
                Today
              </Link>
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button asChild variant="ghost">
              <Link href="/future">Future</Link>
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button asChild variant="ghost">
              <Link href="/tags">Tags</Link>
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu>
        <NavigationMenuList className="flex items-centre gap-4">
          {user ? (
            <NavigationMenuItem>
              <UserButton />
            </NavigationMenuItem>
          ) : (
            <>
              <NavigationMenuItem>
                <Button asChild variant="outline">
                  <Link href="/handler/signin">Sign In</Link>
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button asChild variant="outline">
                  <Link href="/handler/signup">Sign Up</Link>
                </Button>
              </NavigationMenuItem>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      {/* <div className="text-lg font-bold invisible">Bullet Journal</div> */}
    </nav>
  );
}
