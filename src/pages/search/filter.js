import Dataset from "../../modules/dataset"
import SelectList from "../../components/SelectList/SelectList.js"
import React, {useState, useEffect} from "react"
import Slider, {Range} from "rc-slider"
import 'rc-slider/assets/index.css';
import sliderStyle from "./sliderstyles.json"
// import $ from "jquery"

// Formular für filter und so
function FilterForm(props){

    function callOnChange(){
        if (props.onChange !== undefined){
            props.onChange(
                {current:{value:{
                    playercount:pCount,
                    age:age,
                    time:time,
                    gamemodes:gamemodes,
                    gamemechanics:gamemechanics,
                    theme:theme,
                    language:language,
                    communication:communication,
                    goal:goal,
                }}}
            )
        }
    }

    var [time_min, time_max] = Dataset.getMinMax("time")
    const [time, setTime] = useState([time_min, time_max])

    var [pCount_min, pCount_max] = Dataset.getMinMax("playercount")
    const [pCount, setPCount] = useState(pCount_min)

    var [age_min, age_max] = Dataset.getMinMax("age")
    const [age, setAge] = useState(age_min)

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
                // das \/ ist btw eine abkürzung für if, else (genannt ternary-operator), nices teil
                (props.expanded) ? {display:"block"} : {display:"none"}}>
            
            <hr/>

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
                onChange={(e) => setGamemodes(e.current.value)}/>

            <p>Spieldauer: {time[0]}-{time[1]} min</p>
            <Range
                onChange={(value) => setTime(value)}
                value={time}
                min={time_min}
                max={time_max}
                step={15}
                handleStyle={[sliderStyle.handle, sliderStyle.handle]}
                railStyle={sliderStyle.rail}
                trackStyle={[sliderStyle.track]}
                /><br/>
            
            <p>Ziel</p>
            <SelectList 
                items={Dataset.getAllOfCriteria("goal")}
                selected={goal}
                onChange={(e) => setGoal(e.current.value)}/>
            
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
            <SelectList items={[
                "stark eingeschraenkt", 
                "eingeschraenkt", 
                "leicht eingeschraenkt",
                "hoch", 
                "sehr hoch"]}
                selected={communication}
                onChange={(e) => setCommunication(e.current.value)}/><br/><br/>
            
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
                setAge(age_min)
                setPCount(pCount_min)
                setTime([time_min, time_max])
                setGoal([])
                
                callOnChange()
            }}>
                Filter löschen
            </button>
            </div>
        </div>
        </>
    )
}

export default FilterForm