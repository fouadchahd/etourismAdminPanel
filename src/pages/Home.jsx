import axios from 'axios'
import React,{useEffect,useState} from 'react'

const Home = () => {
    const [state, setstate] = useState({});
    useEffect(() => {
        axios.get("http://localhost:8000/tourists").then(response =>{
            console.log(response);
            setstate({...response.data})
        });
    }, [])
    return (
        <div className="app">
        </div>
    )
}

export default Home
