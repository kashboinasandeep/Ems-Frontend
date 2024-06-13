import { useNavigate } from "react-router-dom";
import "./Home.css"
const Home = ()=>{
    const navigate = useNavigate();

    const addemployee = ()=>{
        navigate('/mainform')
    }

    

    
    return(
        <>

       <div className="home_container">
        
        <h1 className="home_header">Employee Managment System</h1>

       <div className="button_section">

       <button onClick={addemployee} className="addemployee">AddEmployee</button>

        
       </div>

       </div>

        </>
    )
}
export default Home;