import Dataset from "../../modules/dataset"
import SelectList from "../../components/SelectList/SelectList.js"
import React, {useState, useEffect} from "react"
// import $ from "jquery"

// Formular für filter und so
function FilterForm(props){

    function callOnChange(){
        if (props.onChange !== undefined){
            props.onChange(
                {current:{value:{
                    playercount:Number(pCount),
                    age:Number(age),
                    time:Number(time),
                    gamemodes:gamemodes,
                    gamemechanics:gamemechanics,
                    theme:theme,
                    language:language,
                    communication:communication,
                }}}
            )
        }
    }

    var [time_min, time_max] = Dataset.getMinMax("time")
    const [time, setTime] = useState(time_min)

    var [pCount_min, pCount_max] = Dataset.getMinMax("playercount")
    const [pCount, setPCount] = useState(pCount_min)

    var [age_min, age_max] = Dataset.getMinMax("age")
    const [age, setAge] = useState(age_min)

    // erstellt states für die SelectLists
    const [gamemodes, setGamemodes] = useState([])
    const [gamemechanics, setGamemechanics] = useState([])
    const [theme, setTheme] = useState([])
    const [language, setLanguage] = useState([])
    const [communication, setCommunication] = useState([])

    // falls sich die komponente updated wird onChange des Parents getriggert und dieser geupdated
    useEffect(() => callOnChange(),
    // \/ brauch ich weil mir react sonst sagt das ich etwas brauche, was ich nicht brauche
    // eslint-disable-next-line
    [time, pCount, age, gamemodes, gamemechanics, theme, language, communication])

    return(
        <>
        {/* ist viel HTML, ich weiß */}

        <div
            className="filter_container noselection"
            style={
                // das \/ ist btw eine abkürzung für if, else (genannt ternary-operator), nices teil
                (props.expanded) ? {display:"block"} : {display:"none"}}>
            
            <hr/>

            <p>Spielerzahl: {pCount}+</p>
            <input 
                className="slider" 
                type="range" 
                min={pCount_min} 
                max={pCount_max} 
                value={pCount}
                onChange={ (e) => setPCount(e.target.value) }/>

                <br/><br/>
            
            <p>Spielmodi</p>
            <SelectList 
                items={Dataset.getAllOfCriteria("gamemodes")}
                selected={gamemodes}
                onChange={(e) => setGamemodes(e.current.value)}/>

            <p>Spieldauer: {time} min</p>
            <input 
                className="slider" 
                type="range" 
                min={time_min} 
                max={time_max} 
                value={time}
                step="15" 
                onChange={ (e) => setTime(e.target.value) }/>
            <br/><br/>
            
            <p>Spielmechanik</p>
            <SelectList 
                items={Dataset.getAllOfCriteria("gamemechanics")}
                selected={gamemechanics}
                onChange={(e) => setGamemechanics(e.current.value)}/>

            <p>Thema</p>
            <SelectList
                items={Dataset.getAllOfCriteria("theme")}
                selected={theme}
                onChange={(e) => setTheme(e.current.value)}/>

            <p>Sprache</p>
            <SelectList
                items={Dataset.getAllOfCriteria("language")}
                selected={language}
                onChange={(e) => setLanguage(e.current.value)}/>

            <p>Alter: {age}+</p>
            <input 
                className="slider" 
                type="range"
                min={age_min} 
                max={age_max} 
                step="1"
                value={age}
                onChange={ (e) => setAge(e.target.value) }/>
            <br/><br/>

            <p>Kommunikation</p>
            <SelectList items={[
                "stark eingeschränkt", 
                "eingeschränkt", 
                "leicht eingeschränkt",
                "hoch", 
                "sehr hoch"]}
                selected={communication}
                onChange={(e) => setCommunication(e.current.value)}/><br/><br/>
            
            <div className="filter_buttons_container">
            <button onClick={callOnChange}>
                    <p>Filter anwenden</p>
                </button>
                <button onClick={() => {
                    setCommunication([])
                    setGamemechanics([])
                    setGamemodes([])
                    setLanguage([])
                    setTheme([])
                    setAge(age_min)
                    setPCount(pCount_min)
                    setTime(time_min)
                    
                    if (props.onChange !== undefined){
            props.onChange(
                {current:{value:{
                    playercount:Number(pCount),
                    age:Number(age),
                    time:Number(time),
                    gamemodes:gamemodes,
                    gamemechanics:gamemechanics,
                    theme:theme,
                    language:language,
                    communication:communication,
                }}}
            )
        }
                }}>
                    <p>Filter löschen</p>
                </button>
            </div>
        </div>
        </>
    )
}

export default FilterForm