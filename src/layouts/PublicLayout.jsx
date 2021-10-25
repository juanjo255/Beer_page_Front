import Footer from 'components/Footer'
import Navbar from 'components/Navbar'

const PublicLayout = ({children}) => {
    return (
        <div className="flex flex-col justify-between h-screen">
            <Navbar/>
            <main className="h-full overflow-y-scroll bg-blue-300" >{children}</main>
            <Footer/>
        </div>
    )
}

export default PublicLayout
