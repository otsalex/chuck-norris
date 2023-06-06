import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";



const Root = () => {

    return (

            <div className="container">
                <Header />
                    <div className="content-wrap">
                        <Outlet /> 
                    </div>
                <Footer />           
            </div>
    );
}

export default Root;
