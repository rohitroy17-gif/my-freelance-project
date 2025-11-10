import React from 'react';
import Banner from './Banner';
import LatestJobs from './LatestJobs';
import TopCategories from './TopCatagories';
import AboutPlatform from './AboutPlatform';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestJobs></LatestJobs>
            <TopCategories></TopCategories>
            <AboutPlatform></AboutPlatform>
        </div>
    );
};

export default Home;