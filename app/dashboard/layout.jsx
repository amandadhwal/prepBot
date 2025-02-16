import React from 'react';
import Header from "./_components/Header";

<<<<<<< HEAD
function DashboardLayout({children}) {
=======
function DashboardLayout({ children }) {
>>>>>>> deb71e4 (Resolved merge conflicts)
    return (
        <div>
            <Header />
            <div className='mx-5 md:mx-20 lg:mx-36'>
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;
