import Dataset from "../../modules/dataset"
import SelectList from "../../components/SelectList/SelectList.js"
import React, {useState, useEffect} from "react"
import Slider, {Range} from "rc-slider"
import 'rc-slider/assets/index.css';
import sliderStyle from "./sliderstyles.json"

// Formular für filter und so
function FilterForm(props){

    function callOnChange(){
        if (props.onChange !== undefined){
            props.onChange(
                {
                    playercount:pCount,
                    age:age,
                    time:time,
                    gamemodes:gamemodes,
                    gamemechanics:gamemechanics,
                    theme:theme,
                    language:language,
                    communication:communication,
                    goal:goal,
                }
            )
        }
    }

    const [time_min, time_max] = Dataset.getMinMax("time")
    const [time, setTime] = useState([time_min, time_max])

    const [pCount_min, pCount_max] = Dataset.getMinMax("playercount")
    const [pCount, setPCount] = useState(pCount_min)

    const [age_min, age_max] = Dataset.getMinMax("age")
    const [age, setAge] = useState(age_max)

    // erstellt states für die SelectLists
    const [gamemodes, setGamemodes] = useState([])
    const [goal, setGoal] = useState([])
    const [gamemechanics, setGamemechanics] = useState([])
    const [theme, setTheme] = useState([])
    const [language, setLanguage] = useState([])
    const [communication, setCommunication] = useState([])

    // falls sich die komponente updated wird onChange des Parents getriggert und dieser geupdated
    useEffect(() => callOnChange(),
    // \/ brauch ich weil mir react sonst sagt das ich etwas brauche, was ich nicht brauche
    // eslint-disable-next-line
    [time, pCount, age, goal, gamemodes, gamemechanics, theme, language, communication])

    return(
        <>
        {/* ist viel HTML, ich weiß */}

        <div
            className="filter_container noselection"
            style={
                // das \/ ist btw eine abkürzung für if else, die ternary-operator genannt wird, nices teil
                (props.expanded) ? {display:"block"} : {display:"none"}}>

            <p>Spielerzahl: {pCount}+</p>
            <Slider
                min={pCount_min} 
                max={pCount_max}
                value={pCount}
                handleStyle={sliderStyle.handle}
                railStyle={sliderStyle.rail}
                trackStyle={sliderStyle.track}
                onChange={ (value) => setPCount(value) }/><br/>
            
            <p>Spielmodi</p>
            <SelectList 
                items={Dataset.getAllOfCriteria("gamemodes")}
                selected={gamemodes}
                onChange={(value) => setGamemodes(value)}/>

            <p>Spieldauer: {time[0]}-{time[1]} min</p>
            <Range
                onChange={(value) => setTime(value)}
                value={time}
                min={time_min}
                max={time_max}
                step={15}
                handleStyle={[sliderStyle.handle, sliderStyle.handle]}
                railStyle={sliderStyle.rail}
                trackStyle={[sliderStyle.track]}/><br/>
            
            <p>Ziel</p>
            <SelectList 
                items={Dataset.getAllOfCriteria("goal")}
                selected={goal}
                onChange={(value) => setGoal(value)}/>
            
            <p>Spielmechanik</p>
            <SelectList 
                items={Dataset.getAllOfCriteria("gamemechanics")}
                selected={gamemechanics}
                onChange={(value) => setGamemechanics(value)}/>

            <p>Thema</p>
            <SelectList
                items={Dataset.getAllOfCriteria("theme")}
                selected={theme}
                onChange={(value) => setTheme(value)}/>

            <p>Sprache</p>
            <SelectList
                items={Dataset.getAllOfCriteria("language")}
                selected={language}
                onChange={(value) => setLanguage(value)}/>

            <p>Alter: {age}+</p>
            <Slider
                min={age_min} 
                max={age_max}
                step="1"
                value={age}
                onChange={ (value) => setAge(value) }
                handleStyle={[sliderStyle.handle, sliderStyle.handle]}
                railStyle={sliderStyle.rail}
                trackStyle={[sliderStyle.track]}/><br/>

            <p>Kommunikation</p>
            <SelectList items={Dataset.getAllOfCriteria("communication")}
                selected={communication}
                onChange={(value) => setCommunication(value)}/><br/><br/>
            
            <div className="filter_buttons_container">
                <button onClick={callOnChange}>
                    Filter anwenden
                </button>
                <button onClick={() => {
                    setCommunication([])
                    setGamemechanics([])
                    setGamemodes([])
                    setLanguage([])
                    setTheme([])
                    setAge(age_max)
                    setPCount(pCount_min)
                    setTime([time_min, time_max])
                    setGoal([])
                    
                    callOnChange()}}>
                    Filter löschen
                </button>
            </div>
            <br/>
            <hr/>
        </div>
        </>
    )
}

export default FilterForm