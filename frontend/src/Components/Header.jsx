import React from 'react'

function Header() {
    return (
        <div className='flex flex-row bg-[#563393] text-white'>
            {/* Right */}
            <div className='flex flex-row items-center'>
                <img src="../Public/image.png" alt="LOGO" className='w-20' />
                <h1>CareSpaceX</h1>
            </div>
            {/* Left */}
            <div>

            </div>
        </div>
    )
}

export default Header