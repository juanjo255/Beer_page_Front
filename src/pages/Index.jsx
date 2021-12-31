import React from 'react'
import index1 from "../media/index1.jpg"
import index2 from  "../media/index2.jpg"
import ScrollAnimation from 'react-animate-on-scroll'
const Index = () => {
    return (
        <div className='flex flex-col overflow-auto bg-gradient-to-b from-black to-yellow-600 my-10'>
            <ScrollAnimation animateIn='fadeInLeft' animateOut='fadeOutRightBig'>
            <div className='flex'>
                <div className='flex justify-around'>
                    <img src={index1} alt="cervezas" className="h-90 w-100 rounded-full bg-gradient-to-tl" />
                </div>

                <div className='text-white font-serif font-semibold text-5xl'>
                    <br/> "Amigos y cerveza fria, <br/>  como minimo una vez al dia"
                </div>
            </div>
            </ScrollAnimation>
            <ScrollAnimation animateIn='fadeInLeft' animateOut='fadeOutRightBig'>
            <div className='flex flex-col w-full my-52'>
                <span className='text-white font-serif font-semibold text-5xl px-5 ' >Sobre nosotros</span>
                <br/>
                <div className='flex justify-around'>
                    <p className='text-white'>Esta es una pagina para una cerveceria donde se pueden mostrar sus productos <br/> 
                        y la empresa puede gestionar los mismos
                    </p>
                    <img src={index2} alt="cervezas" className=" rounded-full bg-gradient-to-tl" />
                </div>
            </div>
            </ScrollAnimation>
        </div>
    )
}

export default Index
