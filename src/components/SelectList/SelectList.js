// importiert React, ein Framework
import React from "react"
//importiert Stylesheet für die Komponente
import "./SelectList.css"

//erstellt eine React Komponente, die automatisch exportiert, also für import verfügbar macht
export default class SelectList extends React.Component{
    constructor(props){
        super(props)
        this.selected = []
        this.container = React.createRef()
    }

    //sagt react was angezeigt werden soll
    render(){
        //erstmal nur ein Button, zum leeren der Auswahl
        var html = <button className="clear" onClick={this.clearSelection}>╳</button>
        
        //fügt einzelne Items hinzu
        for (var item of this.props.items){
            //das ist JSX btw also HTML in Javascript.
            //Aufpassen, da dinge wie class hier className oder anders heißen.
            //Falls du nicht weißt was ID z.B. ist einfach GOOGLE fragen
            var boxsample = 
            <label className="selection_main">
                <input type="checkbox"/>
                <span className="selection_tagmark">
                    {item}
                </span>
            </label>
            
            //packt html und boxsample zusammen.
            //Ich wünschte es ginge mit html += boxsanple, funktioniert aber eher weniger
            html = <>{html}{boxsample}</>
        }

        return(
            <div ref={this.container} className="selection_container noselection" onChange={this.getSelectedItems}>
                {html}
            </div>
        )

    }

    
    getSelectedItems = () => {
        this.selected = []
        for (var i of this.container.current.childNodes){
            if (i.tagName === "LABEL"){
                if (i.childNodes[0].checked){
                    this.selected.push(i.childNodes[1].innerText)
                }
            }
        }
    }

    clearSelection = () =>{
        this.selected = []
        for (var i of this.container.current.childNodes){
            if (i.tagName === "LABEL"){
                i.childNodes[0].checked = false
            }
        }
    }
}