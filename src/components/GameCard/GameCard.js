import "../../pages/search/search.css"
import Dataset from "../../modules/dataset.js"
import "./GameCard.css"

function CriteriaIndicator(props){
    let percents = (props.value - props.min) / (props.max - props.min) * 100

    return(
        <div className="criteria_value">
            <div style={{width:`${percents}%`}}/>
        </div>
    )
}

function CriteriaIndicator2(props){
    const value1 = Math.min(props.value1, props.value2)
    const value2 = Math.max(props.value1, props.value2)
    const percents1 = (value1 - props.min) / (props.max - props.min) * 100
    const percents2 = (value2 - props.min) / (props.max - props.min) * 100

    return(
        <div className="criteria_value">
            <div style={{
                marginLeft:`${percents1}%`,
                width:`${percents2-percents1}%`,              
            }}/>
        </div>
    )
}

export default function GameCard(props){
    var g = Dataset.collection[props.name]
    return(
    <div className="gamecard">
        <div className="delete_btn_container">
            <button
                className="delete_btn"
                onClick={() => {
                    if (window.confirm("Wollen sie dieses wirklich Spiel löschen?")){
                        Dataset.deleteGame(props.name)
                    }
                }}
                >╳</button>
        </div>
        <h1 style={{marginTop:"0"}} className="center">{props.name}</h1>
        <div className="criteria_container">
            <div className="criteria">
                <div className="criteria_title">Spielerzahl</div>
                <div className="criteria_vertical_center">
                    <div className="criteria_val">
                        {`${g.playercount[0]}-${g.playercount[1]}`.replace(/-Infinity/, "+")}
                    </div>

                    <CriteriaIndicator2 
                        min={Dataset.getMinMax("playercount")[0]} 
                        max={Dataset.getMinMax("playercount")[1]} 
                        value1={g.playercount[0]} 
                        value2={g.playercount[1]}/>
                </div>
            </div>

            <div className="criteria">
                <div className="criteria_title">Thema</div>
                <div className="criteria_vertical_center">
                    <div className="criteria_val onlytext">
                        {g.theme.toString().replaceAll(",", ", ")}
                    </div>
                </div>
            </div>

            <div className="criteria">
                <div className="criteria_title">Alter</div>
                <div className="criteria_vertical_center">
                    <div className="criteria_val">
                        {g.age}+
                    </div>
                    <CriteriaIndicator 
                        min={Dataset.getMinMax("age")[0]} 
                        max={Dataset.getMinMax("age")[1]} 
                        value={g.age}/>
                </div>
            </div>

            <div className="criteria">
                <div className="criteria_title">Sprache</div>
                <div className="criteria_vertical_center">
                    <div className="criteria_val onlytext">
                        {g.language.toString().replace(",", "/")}
                    </div>
                </div>
            </div>

            <div className="criteria">
                <div className="criteria_title">Spieldauer</div>
                <div className="criteria_vertical_center">
                    <div className="criteria_val">
                        {g.time}min
                    </div>
                    <CriteriaIndicator 
                        min={Dataset.getMinMax("time")[0]} 
                        max={Dataset.getMinMax("time")[1]} 
                        value={g.time}/>
                </div>
            </div>

            <div className="criteria">
                <div className="criteria_title">Kommunikation</div>
                <div className="criteria_vertical_center">
                    <div className="criteria_val onlytext">
                        {g.communication}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}