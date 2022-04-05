// importiert React, ein Framework
import React, {useState} from "react"
//importiert Stylesheet für die Komponente
import "./SelectList.css"

//erstellt eine React Komponente, die automatisch exportiert, also für import verfügbar macht
export default function SelectList(props){
    // eslint-disable-next-line
    var [selected, setSelected] = useState(props.selected)
    var [showMore, setShowMore] = useState(false)
    let items = [...(new Set(props.items))]
    var container = React.createRef()
    const singleoption = props.single

    //erstmal nur ein Button, zum leeren der Auswahl
    var html =
    <button
        className="clear"
        onClick={clearSelection}></button>
    
    let count = 0
    let itemcount = 0
    var buttonsample = <></>

    //fügt einzelne Items hinzu
    for (const item in items){

        itemcount += 1
        count = count + items[item].length
        if (count > 100 && items.length - itemcount > 2){
            buttonsample = 
            <button className="showmore_button" onClick={() => setShowMore(!showMore)}>
                {(showMore) ? "weniger anzeigen": "mehr amzeigen"}
            </button>
            
            if (showMore === false){break}
        }

        var boxsample = 
        <label className="selection_main">
            <input
            name="SelectListThing"
            checked={props.selected.includes(items[item])}
            onChange={() => {return(false)}}
            type={(singleoption) ? "radio": "checkbox"}/>
            <span className="selection_tagmark">
                {items[item]}
            </span>
        </label>
        //packt html und boxsample zusammen.
        //Ich wünschte es ginge mit html += boxsanple, funktioniert aber eher weniger
        html = <>{html}{boxsample}</>
    }

    html = <>{html}{buttonsample}</>

    return(
        <div id="container" ref={container} className="selection_container noselection" onChange={getSelectedItems}>
            {html}
        </div>
    )

    function clearSelection(){
        setSelected([])

        for (var node of container.current.childNodes){
            if (node.tagName === "LABEL" && node.className === "selection_main"){
                node.childNodes[0].checked = false
            }
        }
        props.onChange([])
    }

    function getSelectedItems(){
        var SelectedOptions = []

        for (var node of container.current.childNodes){
            if (node.tagName === "LABEL" && node.className === "selection_main"){
                if (node.childNodes[0].checked){
                    SelectedOptions.push(node.childNodes[1].innerText)
                }
            }
        }
        setSelected(SelectedOptions)
        if (props.onChange !== undefined){
            props.onChange(SelectedOptions)
        }
    }
}