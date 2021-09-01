import React, {useState} from "react"
import $ from "jquery"
import "./search.css"
import Dataset from "../../modules/dataset"
import FilterForm from "./filter"

function SearchPage(){
    var [userInput, setUserInput] = useState("")
    var [filterExpanded, setfilterExpanded] = useState(false)
    var games = Dataset.startsWith(userInput)

    return(
        <>
        {/* formular für suchleiste etc. */}
        <form onSubmit={handleSubmit} autoComplete="off" id="searchform">
            {/* container für den container der Suchleiste und dem filterknopf, als auch den filter einstellungen */}
            <div className="search_container">
                {/* container der Suchleiste und dem filterknopf*/}
                <div className="searchbar_container">
                {/*suchleiste  */}
                <input type="text" placeholder="Suche" spellCheck="false" id="searchform_input" className="searchbar"/>
                {/* filterknopf */}
                <button className="filter-button" onClick={() => {setfilterExpanded(!filterExpanded)}}>
                    {/* svg zeugs */}
                    <div>
                        <svg fill="#fff">
                            <g transform="scale(0.25)">
                                <path
                                d="M 42.00575,88.516113 30.40478,100 c 0,0 0,0 0,-11.483887 0,-4.40085 0,0 0,-4.40085 l 4.06526,-3.169895 c 1.35561,-1.057028 3.1671,-1.21903 4.38049,0 l 3.15522,3.169895 c 1.21339,1.219037 1.22232,3.190859 0,4.40085 z m 0.91004,-58.274304 v 55.539509 c 0,2.023878 -1.62179,3.653215 -3.6363,3.653215 h -5.2384 c -2.01451,0 -3.63631,-1.629337 -3.63631,-3.653215 V 30.241809 c 0,-2.023882 1.6218,-3.653217 3.63631,-3.653217 h 5.2384 c 2.01451,0 3.6363,1.629335 3.6363,3.653217 z M 3.666,0 h 65.988 c 2.03096,0 3.666,1.6426388 3.666,3.6830467 V 8.988774 c 0,2.040407 -1.63504,3.683046 -3.666,3.683046 H 3.666 C 1.635036,12.67182 0,11.029181 0,8.988774 V 3.6830467 C 0,1.6426388 1.635036,0 3.666,0 Z m 68.62156,6.7947201 c 1.37658,1.3829808 1.37659,3.6097329 0,4.9927159 l -33.14275,33.29687 c -1.37659,1.382982 -3.59304,1.382981 -4.96961,0 L 1.032438,11.787433 c -1.376582,-1.382983 -1.376582,-3.6097343 0,-4.9927173 71.255122,4.4e-6 0,0 71.255122,4.4e-6 z" />
                            </g>
                        </svg>
                    </div>
                </button>
                </div>
                <FilterForm onChange={(e) => console.log(Dataset.hasCriterias(e.current.value))} expanded={filterExpanded}></FilterForm>
            </div>
        </form>
        <GameContainer games={games}></GameContainer>
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

    return(
        <div className="gamecard">
            <h1 className="center">{props.name}</h1>
            <table>
                <tbody>
                    <tr>
                        <td>Thema:</td>
                        <td>{g.theme}</td>
                    </tr>
                    <tr>
                        <td>Alter:</td>
                        <td>{g.age}</td>
                    </tr>
                    <tr>
                        <td>Sprache:</td>
                        <td>{g.language}</td>
                    </tr>
                    <tr>
                        <td>Spieldauer:</td><td>{g.time}</td>
                    </tr>
                    <tr>
                        <td>Kommunikation:</td>
                        <td>{g.communication}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SearchPage