import React from 'react'
import index1 from "../media/index1.jpg"
const Index = () => {
    return (
        <div>
            <div className='flex'>
                <div className='flex justify-around'>
                    <img src={index1} alt="cervezas" className="h-90 w-100 rounded-full bg-gradient-to-tl" />
                </div>
                <div className='text-white font-serif font-semibold text-5xl'>
                    <br/> "Amigos y cerveza fria, <br/>  como minimo una vez al dia"
                </div>
            </div>
            
        </div>
    )
}

export default Index
