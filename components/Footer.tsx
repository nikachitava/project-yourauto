import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="container mx-auto flex justify-between items-center px-4 bg-background-secondary border-t border-border py-6">
            <div className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} yourAuto. All rights reserved.
            </div>

            <div className="flex space-x-4">
                <a
                    href="https://linkedin.com/in/nikachitava18"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-accent transition-colors duration-200"
                    aria-label="LinkedIn"
                >
                    <FaLinkedin className="h-5 w-5" />
                </a>
                <a
                    href="https://github.com/nikachitava"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-accent transition-colors duration-200"
                    aria-label="GitHub"
                >
                    <FaGithub className="h-5 w-5" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
