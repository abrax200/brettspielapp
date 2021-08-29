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
                playercount:`${g.spielerzahl[0]}-${g.spielerzahl[1]}`,
                time:`min. ${g.spieldauer} min`,
                alter:`${g.alter}+`,
                sprache:g.sprache,
                kommunikationslevel:g.kommunikationslevel,
                thema: "Helden, Comic"
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

        console.log(possibilities)

        return possibilities
    }

    startsWith(str){
        var foundGames = []

        for (var i of this.games){
            if (i.toLowerCase().startsWith(str.toLowerCase()))
            {foundGames.push(i)}
        }

        return(foundGames)
    }
}

export default new dataset()