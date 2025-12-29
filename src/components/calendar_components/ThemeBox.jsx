import {React ,useState} from "react"
import ThemeSwitcher from "../general_components/ThemeSwitcher";

function ThemeBox() {

    const [showBox, setShowBox] = useState(false)

    return (
        <div>
        <button style ={{ position: "absolute", right: "170px" }} className= "button-38-small" onClick={() => setShowBox(true)}> Themes </button> 
 {showBox && 
<div className= "key-box">
<p style= {{fontWeight: "bold", textDecoration: "underline", margin: "0 0 1rem 0"}}>Calendar Themes</p>
<div>
 Select a theme: <ThemeSwitcher/>
</div>



<button style ={{position: "absolute"}} className= "button-38-small" onClick={() => setShowBox(false)}> X</button> 

</div>
}

</div>
 
    )
}

export default ThemeBox;