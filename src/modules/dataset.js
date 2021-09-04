// import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
//bin aktuell zu faul die datei tatsächlich einzulesen
import collection from "./data.json"

class dataset{
    constructor(){
        this.collection = collection
    }

    get games(){
        return Object.keys(this.collection)
    }

    game(name){
        var g = this.collection[name]
        return(
            {
                playercount:`${g.playercount[0]}-${g.playercount[1]}`,
                time:`min. ${g.time} min`,
                age:`${g.age}+`,
                language:g.language,
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
                possibilities.push(...value.toString().split(","))
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

    matchesChoice(game, criteria, val) {
        var valueOfCriteria = this.collection[game][criteria]
        
        switch (criteria){
            case "playercount":
                return(val >= valueOfCriteria[0] && val <= valueOfCriteria[1])
            case "age":
                return(val >= valueOfCriteria)
            
            case "time":
                return(val === valueOfCriteria)
        }
    }

    hasCriterias(criterias){
        var foundGames = [] 

        for (var i in this.collection){
            foundGames.push(i)
        }

        return criterias
    }
}

export default new dataset()