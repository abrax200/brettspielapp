import Dataset from "../../modules/dataset"
import SelectList from "../../components/SelectList/SelectList.js"
import React, {useState} from "react"
import {Range} from "rc-slider"
import 'rc-slider/assets/index.css';
import sliderStyle from "./sliderstyles.json"

function CriteriaContainer(props){
    let html = <></>
    let [filter, setFilter] = useState({})

    for (const i of props.list){
        var sample
        if (i.type === "select"){
            sample =
            <div>
                <p>{i.display}</p>
                <SelectList 
                    items={Dataset.getAllOfCriteria(i.name)}
                    selected={(filter[i.name] === undefined) ? []: filter[i.name]}
                    onChange={(selected) => addvalue(i.name, selected)}
                    />
            </div>

        }

        else if (i.type === "slider-double"){
            sample =
            <div>
                <p>{i.display}: {String(filter[i.name]).replace(",", "-")}</p>
                <div className="slider_wrapper">
                    <Range
                        onChange={(v) => addvalue(i.name, v)}
                        value={filter[i.name]}
                        min={Dataset.getMinMax(i.name)[0]}
                        max={Dataset.getMinMax(i.name)[1]}
                        step={1}
                        style={sliderStyle.root}
                        handleStyle={[sliderStyle.handle, sliderStyle.handle]}
                        railStyle={sliderStyle.rail}
                        trackStyle={[sliderStyle.track2]}/>
                </div>
            </div>
        }
        else if (i.type === "slider-single"){
            sample =
            <div>
                <p>{i.display}: {filter[i.name]}</p>
                <div className="slider_wrapper">
                    <Range
                        onChange={(v) => addvalue(i.name, v[1])}
                        value={[Dataset.getMinMax(i.name)[0], filter[i.name]]}
                        min={Dataset.getMinMax(i.name)[0]}
                        max={Dataset.getMinMax(i.name)[1]}
                        step={1}
                        style={sliderStyle.root}
                        handleStyle={[sliderStyle.handle, sliderStyle.handle]}
                        railStyle={sliderStyle.rail}
                        trackStyle={[sliderStyle.track2]}/>
                </div>
            </div>
        }
            else if (i.type === "switch"){
            sample =
            <div>
                <p>{i.display}</p>
                <SelectList
                    single
                    name={i.name}
                    items={["Ja", "Egal", "Nein"]}
                    selected={(filter[i.name] === undefined) ? ["Egal"]: filter[i.name]}
                    onChange={(selected) => addvalue(i.name, selected)}
                    />
            </div>

        }
        html = <><p></p>{html}{sample}</>
    }

    return (<>
        {html}
        <div className="filter_buttons_container">
            <button onClick={() => {props.onChange(filter)}}>
                Filter anwenden
            </button>
            <button onClick={() => {setFilter({}); props.onChange({})}}>
                Filter löschen
            </button>
        </div>
    </>)

    function addvalue(name, v){
        const val = {...filter, [name]:v}
        setFilter(val)
        props.onChange(val)
    }
}
/* <div>
    <p>Ziel</p>
        <SelectList 
            items={Dataset.getAllOfCriteria("goal")}
            selected={goal}
            onChange={(value) => setGoal(value)}/>
</div> */

// Formular für filter und so
function FilterForm(props){
    // eslint-disable-next-line
    let setFilter = useState({})[1]

    return(
        <>
        {/* ist viel HTML, ich weiß */}
        <div
            className="filter_container noselection"
            style={
                // das \/ ist btw eine abkürzung für if else, die ternary-operator genannt wird, nices teil
                (props.expanded) ? {display:"block"} : {display:"none"}}>
            
            <CriteriaContainer 
            list={[
                {name:"playercount", type:"slider-single", display:"Spielerzahl"},
                {name:"gamemodes", type:"select", display:"Spielmodus"},
                {name:"time", type:"slider-double", display:"Spieldauer"},
                {name:"goal", type:"select", display:"Spieldauer"},
                {name:"gametype", type:"select", display:"Spieltyp"},
                {name:"gamemechanics", type:"select", display:"Spielmechanik"},
                {name:"theme", type:"select", display:"Thema"},
                {name:"language", type:"select", display:"Sprache"},
                {name:"age", type:"slider-single", display:"Alter"},
                {name:"communication", type:"select", display:"Kommunikation"},
                {name:"campaign", type:"switch", display:"Kampagne"},
                {name:"oneshots", type:"switch", display:"One-Shots"},
                
            ]}

            onChange={(e) => {props.onChange(Dataset.hasCriterias(e)); setFilter(e)}}
            />
            <br/>
            <hr/>
        </div>
        </>
    )
}

export default FilterForm