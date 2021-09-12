// import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
//bin aktuell zu faul die datei tatsächlich einzulesen
import Collection from "./data.json"

class dataset{
    constructor(collection){
        this.collection = collection
    }

    get games(){
        return Object.keys(this.collection)
    }

    game(name){
        const game = this.collection[name]
        return(
            {
                playercount:`${game.playercount[0]}-${game.playercount[1]}`.replace("Infinity", "unbegrenzt"),
                time:`min. ${game.time} min`,
                age:`${game.age}+`,
                language:`${game.language}`.replace(",", "/"),
                communication:game.communication,
                theme: "Helden, Comic"
            }
        )
    }

    getAllOfCriteria(criteria){
        var possibilities = []

        for (const game of Object.values(this.collection)){
            const ValueOfCriteria = game[criteria]
            if (ValueOfCriteria !== undefined){
                if(Array.isArray(ValueOfCriteria)){
                    possibilities.push(...ValueOfCriteria)
                } else{
                    possibilities.push(ValueOfCriteria)
                }
            }
        }

        possibilities = [...new Set(possibilities.sort())] //entfernt alle duplikate

        return possibilities
    }

    getAllValues(criteria){
        var possibilities = []

        for (const game of Object.values(this.collection)){
            const ValueOfCriteria = game[criteria]
            if (ValueOfCriteria !== undefined){
                if(Array.isArray(ValueOfCriteria)){
                    possibilities.push(...ValueOfCriteria)
                } else{
                    possibilities.push(ValueOfCriteria)
                }
            }
        }

        possibilities = [...new Set(possibilities.sort((a, b) => a - b))] //entfernt alle duplikate

        return possibilities
    }

    getMinMax(criteria){
        var possibilities = this.getAllValues(criteria).filter(item => item !== "Infinity")
        return [possibilities[0], possibilities.pop()]
    }

    startsWith(str){
        var foundGames = []

        for (var i in this.collection){
            if (i.toLowerCase().startsWith(str.toLowerCase()))
            {foundGames.push(i)}
        }

        return(foundGames)
    }

    matchesCriteria(game, criteria, val){
        var valueOfCriteria = game[criteria]

        switch(criteria){
            case "playercount":
                //Schaut ob der gewählte Wert in die Spielrzahl hineinpasst
                return(val >= valueOfCriteria[0] && (valueOfCriteria[1] === "Infinity") ? true: val <= valueOfCriteria[1])
            
            case "age":
                return(val >= valueOfCriteria)
            
            case "time":
                return(val[0] <= valueOfCriteria && val[1] >= valueOfCriteria)
            
            case "communication":
                return(val.includes(valueOfCriteria) || val.length === 0)

            default:
                return(val.every(str => valueOfCriteria.includes(str)) || val === [])
        }
    }

    hasCriterias(criterias){
        var foundGames = [] 
        for (const game in this.collection){
            //Das ding stellt im wesentlichen sicher das alle Kriterien erfüllt sind
            
            var matchesAllCheckedCriterias = true
            for (const criteria in criterias){
                const val = criterias[criteria]
                const matchesThisCriteria = this.matchesCriteria(this.collection[game], criteria, val)
                matchesAllCheckedCriterias = matchesAllCheckedCriterias && matchesThisCriteria
            }
            if(matchesAllCheckedCriterias){
                foundGames.push(game)
            }
        }

        return foundGames
    }
}

export default new dataset(Collection)