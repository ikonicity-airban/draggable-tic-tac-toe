import useAuth from "../lib/hooks/useAuth";
import "./Header.css";
import Logo from "./Logo";
import { Sparkle } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";

export default function Header() {
  const { /* login */ logout } = useAuth();
  

  return (
    <header className="header">
      <div className="flex items-center justify-center size-10">
        <Logo />
      </div>
      <div className="" onClick={logout}></div>

      <Drawer>
        <DrawerTrigger className="">
          <div className="relative">

          <Sparkle  size={30} className="text-[#fff9]" />
          <Sparkle  size={10} className="text-[#fff9] absolute bottom-0 left-0" />
          </div>
        </DrawerTrigger>
        <DrawerContent className="bg-[#fff1] backdrop-blur-md">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
