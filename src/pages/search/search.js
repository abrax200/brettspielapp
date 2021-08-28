import React, {useState} from "react"
import $ from "jquery"
import "./search.css"
import Dataset from "../../modules/dataset"

function SearchPage(){
    var [userInput, setUserInput] = useState("")
    return(
        <>
        <form onSubmit={handleSubmit} autoComplete="off" id="searchform">
            <div className="searchbar_container">
                <input type="text" placeholder="Suche" spellCheck="false" id="searchform_input" className="searchbar"/>
            </div>
        </form>
        <GameContainer games={Dataset.startsWith(userInput)}></GameContainer>

        </>
    )

    function handleSubmit(e){
        e.preventDefault();
        setUserInput($("#searchform_input").val())
        $("#searchform_input").trigger("blur")
    }
}

function GameContainer(props){
    var html = <></>
    for (var i of props.games){
        html = <>{html}<GameCard name={i}/></>
    }

    return html
}

function GameCard(props){
    var g = Dataset.game(props.name)

    var kommunikationslevel = ["stark eingeschränkt", "eingeschränkt", "leicht eingeschränkt", "hoch", "sehr hoch"]

    return(
        <div className="gamecard">
            <h1 className="center">{props.name}</h1>
            <table>
                <tr>
                    <td>Thema:</td>
                    <td>{g.thema}</td>
                </tr>
                <tr>
                    <td>Alter:</td>
                    <td>{g.alter}</td>
                </tr>
                <tr>
                    <td>Sprache:</td>
                    <td>{g.sprache}</td>
                </tr>
                <tr>
                    <td>Spieldauer:</td>
                    <td>{g.time}</td>
                </tr>
                <tr>
                    <td>Kommunikation:</td>
                    <td>{kommunikationslevel[g.kommunikationslevel]}</td>
                </tr>
            </table>
        </div>
    )
}

export default SearchPage