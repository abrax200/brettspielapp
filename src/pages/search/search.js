import React, {useState, useEffect} from "react"
import $ from "jquery"
import "./search.css"
import Dataset from "../../modules/dataset"
import FilterForm from "./filter"
import GameCard from "../../components/GameCard/GameCard"
import SelectList from "../../components/SelectList/SelectList.js"

function SearchPage(){
    const [FilterExpanded, setfilterExpanded] = useState(false)
    const [DialogueOpen, setDialogueOpen] = useState(false)
    const [Games, setGames] = useState(Dataset.games())
    Dataset.addOnDelete(() => {setGames(Games.filter((i) =>
        Dataset.games().includes(i)
    ))})

    return(
        <>
        <NewGameDialogue 
            open={DialogueOpen} 
            close={() => 
            setDialogueOpen(false)}
            onSubmit={(game) => {
                let name = game.name
                Dataset.newGame({[name]:game})
                setGames(Dataset.games())
            }}
            dial={[
                {name:"name", display:"Wie heißt das Spiel?", placeholder:"z. B. Schach", type:"text"},
                {name:"playercount", display:"Wie viele Spieler?", type:"dual-number"},
                {name:"time", display:"Wie viele Minuten braucht man ungefähr pro Spiel?", type:"number"},
                {name:"age", display:"Ab welchem Alter ist das Spiel geeignet?", type:"number"},
                {name:"gamemodes", display:"Welche Spielmodi gibt es?", type:"select", placeholder:"z. B. Solo"},
                {name:"goal", display:"Was ist das Ziel des Spiels?", type:"select", placeholder:"z. B. Boss besiegen"},
                {name:"gametype", display:"Was für ein Typ ist dieses Spiel?", type:"select", placeholder:"z. B. Brettspiel"},
                {name:"gamemechanics", display:"Welche Spielmechaniken gibt es?", type:"select", placeholder:"z. B. Echtzeit"},
                {name:"theme", display:"Um welches Thema dreht sich das Spiel?", type:"select", placeholder:"z. B. Abenteuer"},
                {name:"language", display:"In welchen Sprachen kann man das Spiel spielen?", type:"select", placeholder:"z. B. Englisch"},
                {name:"communication", display:"Wie stark ist die Kommunikation?", type:"select", placeholder:"z. B. stark eingeschränkt"},
                {name:"campaign", display:"Gibt es eine Kampagne", type:"boolean"},
                {name:"oneshots", display:"Gibt es One-Shots?", type:"boolean"},

            ]}/>
        {/* container für den container der Suchleiste und dem filterknopf, als auch den filter einstellungen */}
        <div className="search_container">
            {/* container der Suchleiste und dem filterknopf*/}
            {/* formular für suchleiste etc. */}
            <FilterForm
                onChange={(res) => setGames(res)}
                expanded={FilterExpanded}/>
            <div className="searchbar_container">
                {/*suchleiste  */}
                <form
                    onSubmit={handleSubmit}
                    className="searchbar_form">
                    <input
                        type="text"
                        autoComplete="off"
                        placeholder="Suche"
                        spellCheck="false"
                        id="searchform_input"
                        className="searchbar"/>
                </form>
                {/* filterknopf */}
                <button
                    	className="filter-button"
                        onClick={() => {setfilterExpanded(!FilterExpanded)}}>
                    Filter
                </button>
                <button
                    className="addgame_btn"
                    onClick={() => setDialogueOpen(true)}>
                    Neues Spiel
                </button>
            </div>
        </div>
        <GameContainer games={Games}/>
        </>
    )

    function NewGameDialogue(props){
        const [page, setPage] = useState(0)
        let qhtml;
        const [criterias, setCriterias] = useState({})
        const [newItems, setNewItems] = useState([])
        const [text, setText] = useState("")
        const name = props.dial[page].name

        useEffect(() => {
            $("#new_game_input").trigger("focus")
            setText("")
            setNewItems([])
        }, [page,])

        switch(props.dial[page].type) {
            case "text":
                qhtml = <>
                    <form
                        style={{width:"100%", height:"auto", display:"flex", justifyContent:"center"}} 
                        onSubmit={(e) => {
                        setPage(page + 1)
                        
                        e.preventDefault()
                        }}>
                        <input
                            id="new_game_input"
                            className="new_game_text_input"
                            value={
                            (criterias[name] === undefined) ? 
                                "":
                                criterias[name]} 
                            style={{display:"block"}} 
                            type="text"
                            autoComplete="off"
                            placeholder={props.dial[page].placeholder}
                            spellCheck="false"
                            onChange={(e) => addvalue(name, e.currentTarget.value)}
                            />
                    </form>
                </>
                break

                case "number":
                    qhtml = <>
                        <form 
                            style={{width:"100%", height:"auto", display:"flex", justifyContent:"center"}}
                            onSubmit={(e) => {
                            e.preventDefault()
                            setPage(page + 1)
                            
                            }}>
                            <input
                                className="new_game_text_input"
                                id="new_game_input"
                                value={
                                (criterias[name] === undefined) ? 
                                    "":
                                    criterias[name]} 
                                style={{display:"block"}} 
                                type="number"
                                min="0"
                                autoComplete="off"
                                spellCheck="false"
                                onInput={(e) => addvalue(name, parseInt(e.currentTarget.value.replace("", "0")))}
                                />
                        </form>
                    </>
                    break

                    case "dual-number":
                        let pair = (criterias[name] === undefined) ? 
                            [0, 0]: 
                            criterias[name]

                        qhtml = <>
                            <div style={{width:"100%", height:"fit-content", justifyContent:"space-around", alignItems:"center",flexWrap:"nowrap"}}>
                                <form style={{width:"30%", height:"min-content", display:"inline-block"}} onSubmit={(e) => {
                                    $("#new_game_input2").trigger("focus")
                                    e.preventDefault(e)
                                    }}>
                                    <input
                                        style={{width:"100%", boxSizing:"border-box"}}
                                        id="new_game_input"
                                        className="new_game_text_input"
                                        value={
                                        (criterias[name] === undefined) ? 
                                            "":
                                            criterias[name][0]} 
                                        type="number"
                                        min="0"
                                        autoComplete="off"
                                        spellCheck="false"
                                        onInput={(e) => {
                                            pair[0] = e.currentTarget.value
                                            addvalue(
                                                name, [parseInt(pair[0]), parseInt(pair[1])])
                                            }}
                                        />
                                </form>
                                <span
                                    style={{display:"inline-block", width:"fit-content", color:"var(--icon-color)", height:"0px", margin:"0 20px", fontSize:"16px", fontWeight:"bolder", transform:"scaleX(2)"}}
                                >-</span>
                                <form style={{width:"30%", height:"auto", display:"inline-block"}} 
                                    onSubmit={(e) => {
                                    setPage(page + 1)
                                    
                                    e.preventDefault()
                                    }}>
                                    <input
                                        style={{width:"100%", boxSizing:"border-box"}}
                                        id="new_game_input2"
                                        className="new_game_text_input"
                                        value={
                                        (criterias[name] === undefined) ? 
                                            "":
                                            criterias[name][1]} 
                                        type="number"
                                        min="0"
                                        autoComplete="off"
                                        spellCheck="false"
                                        onInput={(e) => {
                                            pair[1] = e.currentTarget.value
                                            addvalue(name, [parseInt(pair[0]), parseInt(pair[1])])
                                        }}
                                        /> 
                                </form>
                            </div>
                        </>
                        break
            
            case "boolean":
                qhtml = <>
                    <SelectList
                        single
                        items={["Ja", "Nein"]}
                        selected={
                            (criterias[name] === undefined) ? 
                                "":
                                criterias[name]}
                        onChange={(v) => {console.log("V",v[0]);addvalue(name, v[0])}}
                        />
                </>
                break
            
            case "select":
                criterias[name] = (criterias[name] === undefined) ? []: criterias[name]
                
                qhtml = <>
                    <form
                    style={{width:"100%", marginBottom:"10px", height:"auto", display:"flex", justifyContent:"center"}}
                    onSubmit={(e) => {

                        if (text === ""){setPage(page + 1)}
                        else if (criterias[name] === []){
                            setNewItems([text, ...newItems])
                            addvalue(name, [text,])
                        } 
                        else if(criterias[name].includes(text)){void(0)}
                        else{
                            setNewItems([text, ...newItems])
                            addvalue(name, [...criterias[name], text,])
                        }
                        setText("")
                        e.preventDefault()
                        }}>
                        <input
                            id="new_game_input"
                            placeholder={props.dial[page].placeholder}
                            className="new_game_text_input"
                            value={text}
                            onInput={(e) => setText(e.currentTarget.value)}
                        />
                    </form>
                    <SelectList
                        items={[...Dataset.getAllOfCriteria(name), ...criterias[name]]}
                        selected={criterias[name]}
                        onChange={(v) => {
                            const val = newItems.filter((i) => v.includes(i))
                            setNewItems(val)
                            addvalue(name, v)
                            }}
                        />
                </>
                break
            
            default:
                qhtml = <></>
                break
        }

        return(
            <button style={(props.open) ? {
                position:"fixed",
                zIndex:"10000",
                left:"0",
                top:"0",
                width:"100%",
                height:"100vh",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                backgroundColor:"transparent",
                border:"none",
                backdropFilter:"saturate(85%) contrast(50%) brightness(45%)",
            }: {display:"none"}}>
                <div className="gamecard new_game_dialogue">
                    <div className="gamecard rest">
                        <div>
                            <button
                                style={{float:"right", display:"block"}}
                                className="clear"
                                onClick={props.close}>╳</button>
                        </div>
                        <h1>{props.dial[page].display}</h1>
                    </div>
                    <div className="gamecard input_container">
                        {qhtml}
                    </div>
                    <div className="gamecard btn_container">
                        <button 
                            style={{display:(page === 0) ? "none": "inline-block"}}
                            onClick={() => {
                                setPage(page - 1)
                                }}>
                            {"<"}
                        </button>
                        <button
                            style={{display:(page === props.dial.length - 1) ? "none": "inline-block"}} 
                            onClick={() => {
                                setPage(page + 1)
                                }}>
                            {">"}
                        </button>
                        <button
                            style={{display:(page === props.dial.length - 1) ? "inline-block": "none"}} 
                            onClick={() => props.onSubmit(criterias)}>
                            {"Fertig"}
                        </button>
                    </div>
                </div>
            </button>
        )

        function addvalue(name, v){
            const val = {...criterias, [name]:v}
            setCriterias(val)
        }
    }

    function handleSubmit(e){
        //sucht nach Spielen die mit dem Input anfangen
        e.preventDefault()
        setGames( Dataset.startsWith( $("#searchform_input").val()))
        $("#searchform_input").trigger("blur")
    }

}

function GameContainer(props){
    var html = <></>
    for (var i of props.games){
        html = <>{html}<GameCard name={i}/></>
    }

    return <div className="gamecard_container">{html}</div>
}

export default SearchPage