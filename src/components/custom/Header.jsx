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
      <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="flex items-center gap-3">
          <img className="logo h-8" src="/icon.png" alt="logo" />
          <span className="text-xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>Smart Trip AI</span>
        </div>
      </a>

      {/* Buttons and user profile */}
      {user ? (
        <div className="flex items-center gap-3">
          <a
            href="/create-trip"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button variant="outline" className="rounded-full">
              + Create Trip
            </Button>
          </a>
          <a
            href="/my-trips"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button>
          </a>
          <Popover>
            <PopoverTrigger>
              <img
                src={user?.picture}
                alt="profile-picture"
                className="h-[35px] w-[35px] rounded-full"
              />
            </PopoverTrigger>
            <PopoverContent>
              <h2 className="cursor-pointer" onClick={logout}>
                Logout
              </h2>
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
