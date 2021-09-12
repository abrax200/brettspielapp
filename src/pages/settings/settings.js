import {useState} from "react"
import $ from "jquery"

function SettingsPage(){
    var [color1, setColor1] = useState("#ff2655")
    var [color2, setColor2] = useState("#ff2692")
    $("#gradient").css({"background-image":`linear-gradient(to right, ${color1}, ${color2})`})
    $(":root").css({"--red":color1, "--red2":color2})

    return(
        <>
        <input 
            className="color"
            type="color"
            value={color1}
            onChange={(e) => {setColor1(e.target.value)}}/>
        <input 
            className="color" 
            type="color"
            value={color2}
            onChange={(e) => {setColor2(e.target.value)}}/>
        <button onClick={() => {setColor1("#ff2655");setColor2("#ff2692")}}>RESET</button>
        <div id="gradient">
        </div>
        </>
    )
}

export default SettingsPage