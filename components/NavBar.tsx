"use client";

import React, { useActionState, useEffect, useState } from "react";
import { ModeToggle } from "./ToggleDarkMode";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { logout } from "@/actions/LogOutAction";

const NavBar = ({ userData }: { userData: User | null }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [state, logOutAction, isPending] = useActionState(logout, undefined);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
                isScrolled
                    ? "bg-background/80 dark:bg-background-tertiary/80 backdrop-blur-md border-b border-border/50"
                    : "bg-transparent border-b border-transparent"
            }`}
        >
            <div className="container mx-auto flex justify-between items-center px-4 py-3">
                <h1 className="font-poppins text-2xl md:text-3xl font-semibold">
                    <span className="text-muted-foreground">your</span>
                    <span className="text-foreground">Auto</span>
                </h1>
                <nav className="flex items-center space-x-4">
                    <Link href={"/"}>Home</Link>
                    {userData ? (
                        <>
                            <Link href={"/profile"}>Profile</Link>
                            <form action={logOutAction}>
                                <Button
                                    type="submit"
                                    variant={"outline"}
                                    size="sm"
                                    className="cursor-pointer"
                                    disabled={isPending}
                                >
                                    {isPending ? "Logging out..." : "Logout"}
                                </Button>
                            </form>
                        </>
                    ) : (
                        <Link href={"/auth/login"}>Login</Link>
                    )}
                    <ModeToggle />
                </nav>
            </div>
        </header>
    );
};

export default NavBar;
