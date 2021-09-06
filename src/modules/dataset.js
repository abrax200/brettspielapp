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
        var g = this.collection[name]
        return(
            {
                playercount:`${g.playercount[0]}-${g.playercount[1]}`.replace("Infinity", "unbegrenzt"),
                time:`min. ${g.time} min`,
                age:`${g.age}+`,
                language:`${g.language}`.replace(",", "/"),
                communication:g.communication,
                theme: "Helden, Comic"
            }
        )
    }

    getAllOfCriteria(criteria){
        var possibilities = []

        for (var i of Object.values(this.collection)){
            var value = i[criteria]
            if (value !== undefined){
                possibilities.push(...value)
            }
        }

        possibilities = [...new Set(possibilities.sort())] //entfernt alle duplikate

        return possibilities
    }

    getAllValues(criteria){
        var possibilities = []

        for (var i of Object.values(this.collection)){
            var value = i[criteria]
            if (value !== undefined){
                if(Array.isArray(value)){
                    possibilities.push(...value)
                } else{
                    possibilities.push(value)
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
        for (var game in this.collection){
            var bool = true
            for (var criteria in criterias){
                var val = criterias[criteria]
                var matches = this.matchesCriteria(this.collection[game], criteria, val)
                bool = bool && matches
                // console.log(game, criteria, this.matchesCriteria(this.collection[game], criteria, val))
            }
            if(bool){
                foundGames.push(game)
            }
        }

        return foundGames
    }
}

export default new dataset(Collection)