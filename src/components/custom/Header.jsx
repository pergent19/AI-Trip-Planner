import { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiMenu } from "react-icons/fi"; // Icon for mobile menu

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (response) => getUserProfile(response),
    onError: (error) => console.log(error),
  });

  const getUserProfile = async ({ access_token }) => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(data));
      setOpenDialog(false);
    } catch (error) {
      console.error(
        "Error fetching user profile:",
        error.response?.data || error.message
      );
    }
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const signIn = () => {
    setOpenDialog(true);
  };

  const logout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      {/* Logo and website name */}
      <a href="/" className="flex items-center gap-3" style={{ textDecoration: "none", color: "inherit" }}>
        <img className="logo h-8" src="/icon.png" alt="logo" />
        <span className="text-xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>Smart Trip AI</span>
      </a>

      {/* Buttons and user profile */}
      {user ? (
        <div className="flex items-center gap-3">
          {/* For large screens: Show Create Trip and My Trips */}
          <a href="/create-trip" className="hidden sm:block" style={{ textDecoration: "none", color: "inherit" }}>
            <Button variant="outline" className="rounded-full">
              + Create Trip
            </Button>
          </a>
          <a href="/my-trips" className="hidden sm:block" style={{ textDecoration: "none", color: "inherit" }}>
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button>
          </a>

          {/* Avatar and menu for small screens */}
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src={user?.picture} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>

            <PopoverContent className="p-4">
              {/* Show on small screens */}
              <div className="block sm:hidden">
                <a href="/create-trip" className="block mb-3">
                  <Button variant="outline" className="w-full">
                    + Create Trip
                  </Button>
                </a>
                <a href="/my-trips" className="block mb-3">
                  <Button variant="outline" className="w-full">
                    My Trips
                  </Button>
                </a>
              </div>
              
              <Button variant="outline" className="w-full" onClick={logout}>
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button onClick={signIn}>Sign In</Button>
      )}

      {/* Dialog for Google Sign-In */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <img className="logo" src="/icon.png" alt="" />
            </DialogTitle>
            <DialogDescription>
              <span className="font-bold text-lg mt-7 block">
                Sign In With Google
              </span>
              <span>
                Sign in to the App with Google Authentication Securely
              </span>
              <Button
                className="w-full mt-5 flex gap-4 items-center"
                onClick={login}
              >
                <FcGoogle className="h-7 w-7" /> Sign In With Google
              </Button>
              <Button
                className="w-full mt-5"
                variant="outline"
                onClick={closeDialog}
              >
                Close
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
