import Navbar from 'components/Navbar'

const PublicLayout = ({children}) => {
    return (
        <div className="flex flex-col justify-between h-full">
            <Navbar/>
            <main className=" bg-black" >{children}</main>
        </div>
    )
}

export default PublicLayout;
