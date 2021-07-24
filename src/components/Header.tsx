import { Link } from "react-router-dom";

export default function Header(){
    return <Link to="/" style={{ textDecoration: 'none', color:"black" }}>
        <h1> PlayBoy Prework APP</h1>
    </Link>
  
}