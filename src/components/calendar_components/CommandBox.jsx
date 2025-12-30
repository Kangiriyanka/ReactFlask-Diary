import {React,useState} from "react"
import ThemeSwitcher from '../general_components/ThemeSwitcher.jsx'

function CommandBox() {

    const [showBox, setShowBox] = useState(false)

    return (
        <div>
        <button style ={{ }} className= "button-38-small" onClick={() => setShowBox(true)}> Commands</button> 
 {showBox && 
<div className= "key-box">
<p style= {{fontWeight: "bold", fontSize: "1.5rem", margin: "0 0 1.2rem 0"}}>Commands</p>
<div>
 1. Press keys <span className="key">←</span> <span className="key">→</span> to change years  

</div>


<div style= {{marginTop: "1rem"}}>
2. Press the keys in your number row to change months.
</div>

<button style ={{position: "absolute"}} className= "button-38-small" onClick={() => setShowBox(false)}> X</button> 

</div>
}

</div>
 
    )
}

export default CommandBox;