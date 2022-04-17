import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle'
import './App.css';
import Register from "./components/auth/Register";
import {Route, Routes} from "react-router-dom";
import Login from "./components/auth/Login";
import Profile from "./components/user/Profile";
import Navbar from "./components/basic/Navbar";
import Home from "./components/Home";
import {UserProvider} from "./contexts/UserContext";
import Libraries from "./components/library/Libraries";
import Library from "./components/library/Library";

function App() {

    return (
        <UserProvider>
            <Navbar/>
            <div class="container">
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/profile' element={< Profile/>}/>
                    <Route path='/libraries' element={< Libraries/>}/>
                    <Route path="/libraries/:libraryId" element={<Library/>}/>
                </Routes>
            </div>
        </UserProvider>
    );
}

export default App;
