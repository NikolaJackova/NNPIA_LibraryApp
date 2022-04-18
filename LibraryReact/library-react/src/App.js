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
import Footer from "./components/basic/Footer";
import Book from "./components/book/Book";

function App() {

    return (
        <div class="d-flex flex-column min-vh-100">
        <UserProvider>
            <Navbar/>
            <div class="container-md p-sm-3">
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/profile' element={< Profile/>}/>
                    <Route path='/libraries' element={< Libraries/>}/>
                    <Route path="/libraries/:libraryId" element={<Library/>}/>
                    <Route path="/libraries/:libraryId/books/:bookId" element={<Book/>}/>
                </Routes>
            </div>
            <Footer/>
        </UserProvider>
        </div>
    );
}

export default App;
