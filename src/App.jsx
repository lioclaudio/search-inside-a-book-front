import "./App.css";
import PDF from "./components/PDF";
import {  Route, Routes } from "react-router-dom";
import SearchBook from "./components/SearchBook.jsx";

function App() {
    
    return (
        <>  
        <Routes>
            <Route path="/pdf" element={<PDF/>}/>
            <Route path="/" element={<SearchBook/>}/>
        </Routes>
        </>
               
    );
}

export default App;



