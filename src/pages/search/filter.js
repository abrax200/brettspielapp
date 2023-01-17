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
        if (i.filter_type_a === "set"){
            sample =
            <div className="gamecard spacing">
                <p>{i.display}</p>
                <SelectList 
                    items={Dataset.getAllOfCriteria(i.name)}
                    selected={(filter[i.name] === undefined) ? []: filter[i.name]}
                    onChange={(selected) => addvalue(i.name, selected)}
                    />
            </div>

        }

        else if (i.filter_type_a === "double_number"){
            sample =
            <div className="gamecard spacing">
                <p>{i.display}: {String(filter[i.name]).replace(",", " – ").replace("undefined", "")}</p>
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
        else if (i.filter_type_a === "single_number"){
            sample =
            <div className="gamecard spacing">
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
            else if (i.filter_type_a === "bool"){
            sample =
            <div className="gamecard spacing">
                <p>{i.display}</p>
                <SelectList
                    single
                    name={i.name}
                    items={["Ja", "Egal", "Nein"]}
                    selected={(filter[i.name] === undefined) ? ["Egal"]: {[true]:["Ja"], [false]:["Nein"]}[filter[i.name]]}
                    onChange={(selected) => {
                        if(selected[0] === "Egal"){
                            deletevalue(i.name)
                        }
                        else {
                            addvalue(i.name, {"Ja":true, "Nein":false}[selected[0]])
                        }
                    }}
                    />
            </div>

        }
        html = <>{html}{sample}</>
    }

    return (<>
        <div className="FilterCriteriaContainer">
            {html}
        </div>
        <div className="filter_buttons_container">
            <button onClick={() => {props.onChange(filter)}}>
                Filter anwenden
            </button>
            <button onClick={() => {setFilter({}); props.onChange([])}}>
                Filter löschen
            </button>
        </div>
    </>)

    function addvalue(name, v){
        const val = {...filter, [name]:v}
        setFilter(val)
        props.onChange(val)
    }
    function deletevalue(name, v){
        // eslint-disable-next-line
        const {[name]:property, ...val} = filter
        
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
            <hr/>
            <CriteriaContainer 
            list={Dataset.collection.criterias}

            onChange={(e) => {props.onChange(Dataset.hasCriterias(e)); setFilter(e)}}
            />
            <br/>
        </div>
        </>
    )
}

export default FilterForm