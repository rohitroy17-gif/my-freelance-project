import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { Twitter } from 'lucide-react';
import { NavLink } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-10">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                
                {/* Left Section */}
                <div className="mb-4 md:mb-0">
                    <h2 className="text-xl font-bold">Hero.IO</h2>
                    <p className="text-gray-400 mt-1">&copy; 2025 Hero.IO. All rights reserved.</p>
                </div>

                {/* Middle Section - Navigation Links */}
                

                {/* Right Section - Social Icons */}
                <div className="flex gap-4">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <Github className="hover:text-pink-400" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="hover:text-pink-400" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <Twitter className="hover:text-pink-400" />
                    </a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
