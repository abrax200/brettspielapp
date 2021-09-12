// importiert React, ein Framework
import React, {useState} from "react"
//importiert Stylesheet für die Komponente
import "./SelectList.css"

//erstellt eine React Komponente, die automatisch exportiert, also für import verfügbar macht
export default function SelectList(props){

    var [selected, setSelected] = useState(props.selected)
    var container = React.createRef()

    //erstmal nur ein Button, zum leeren der Auswahl
    var html =
    <button
        className="clear"
        onClick={clearSelection}>╳</button>
    
    //fügt einzelne Items hinzu
    for (const item of props.items){

        var boxsample = 
        <label className="selection_main">
            <input
            checked={selected.includes(item)}
            onChange={() => {return(false)}}
            type="checkbox"/>
            <span className="selection_tagmark">
                {item}
            </span>
        </label>
        //packt html und boxsample zusammen.
        //Ich wünschte es ginge mit html += boxsanple, funktioniert aber eher weniger
        html = <>{html}{boxsample}</>
    }
    return(
        <div id="container" ref={container} className="selection_container noselection" onChange={getSelectedItems}>
            {html}
        </div>
    )

    function clearSelection(){
        setSelected([])

        for (var node of container.current.childNodes){
            if (node.tagName === "LABEL"){
                node.childNodes[0].checked = false
            }
        }
        props.onChange([])
    }

    function getSelectedItems(){
        var SelectedOptions = []

        for (var node of container.current.childNodes){
            if (node.tagName === "LABEL"){
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