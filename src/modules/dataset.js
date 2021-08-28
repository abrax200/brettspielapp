// import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
//bin aktuell zu faul die datei tatsächlich einzulesen
import collection from "./data.json"

class dataset{
    constructor(){
        this.collection = collection
    }

    get games(){
        console.log(Object.keys(this.collection))
        return Object.keys(this.collection)
    }

    getall(key){
        for (var i of this.games){
            console.log(this.collection[i])
        }
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