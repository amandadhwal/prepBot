import React from 'react';
import Header from "./_components/Header";
import Footer from './_components/Footer';

function DashboardLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className='mx-5 md:mx-20 lg:mx-36 flex-grow'>
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default DashboardLayout;