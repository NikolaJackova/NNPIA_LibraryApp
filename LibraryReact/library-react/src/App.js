import './App.css';
import Register from "./components/auth/Register";
import {Route, Routes} from "react-router-dom";
import Login from "./components/auth/Login";
import Profile from "./components/user/Profile";
import Navbar from "./components/basic/Navbar";
import Home from "./components/Home";
import {UserProvider} from "./contexts/UserContext";
import Libraries from "./components/library/Libraries";

function App() {

    return (
        <UserProvider>
            <div class="App">
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/profile' element={< Profile/>}/>
                    <Route path='/libraries' element={< Libraries/>}/>
                </Routes>
            </div>
        </UserProvider>
    );
}

export default App;
