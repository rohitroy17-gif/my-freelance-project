import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router';

const Banner = () => {
    return (
        <section className="relative bg-gradient-to-r from-purple-500 to-indigo-600 text-white h-[400px] flex items-center justify-center overflow-hidden md:mt-1 mt-50">
            
            {/* Animated Background Circles */}
            <motion.div
                className="absolute w-[500px] h-[500px] bg-white opacity-10 rounded-full -top-20 -left-20 animate-pulse"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
                className="absolute w-[300px] h-[300px] bg-white opacity-10 rounded-full -bottom-20 -right-10 animate-pulse"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
            />

            {/* Banner Content */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="text-center z-10 px-4"
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Welcome to Freelance Marketplace
                </h1>
                <p className="text-lg md:text-2xl mb-6">
                    Reliable platform to find the best freelancers or hire talent for your projects.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <NavLink to="/how-reliable">
                        <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                            How Reliable
                        </button>
                    </NavLink>
                    <NavLink to="/add-job">
                        <button className="bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-800 transition">
                            Create a Job
                        </button>
                    </NavLink>
                </div>
            </motion.div>
        </section>
    );
};

export default Banner;
