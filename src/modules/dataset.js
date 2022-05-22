import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import Collection from "./data.json"

class dataset{

    constructor(collection){
        this.collection = collection
        this.onLoad = () => {}
        this.onDelete = () => {}
        this.CheckForFile()
    }

    addJSONtoCollection(json){
        this.collection = {...this.collection, ...json}
        this.saveCollection()
    }


    games(){
        const val = Object.keys(this.collection)
        val.sort()
        return val 
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

        return(foundGames.sort())
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

            case "oneshots":
                if (val[0] === "Egal"){
                    return true
                    
                }
                else {
                    //console.log(val, valueOfCriteria)
                    return(val[0].toLowerCase() === valueOfCriteria.toLowerCase())  
                }
            case "campaign":
                if (val[0] === "Egal"){
                    return true
                    
                }
                else {
                    //console.log(val, valueOfCriteria)
                    return(val[0].toLowerCase() === valueOfCriteria.toLowerCase())  
                }

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
                //console.log(criteria, val)
                //console.log(game, this.collection[game][criteria])
                ////console.log(matchesThisCriteria)
                matchesAllCheckedCriterias = matchesAllCheckedCriterias && matchesThisCriteria
            }
            if(matchesAllCheckedCriterias){
                foundGames.push(game)
            }
        }

        return foundGames.sort()
    }

    async newGame(game){
        this.collection = {...this.collection, ...game}
        this.saveCollection()
        
    }

    async deleteCollection(){
        Filesystem.deleteFile({
            path: "collection.json",
            directory: Directory.Data,
        })
        .then(
            () => console.log("Succesfully delted file")
        )
        .catch(
            (err) => console.error(err)
        )
    }

    async saveCollection(){
        Filesystem.writeFile({
            path: "collection.json",
            data: JSON.stringify(this.collection),
            directory: Directory.Data,
            encoding: Encoding.UTF8
        })
        .then(
            () => console.log("Succesfully written to file")
        )
        .catch(
            (err) => console.error(err)
        )
    }

    async deleteGame(name){
        delete this.collection[name]
        this.saveCollection()
        this.onDelete()
    }

    addOnLoad(fun){
        this.onLoad = fun
    }

    addOnDelete(fun){
        this.onDelete = fun
    }

    async CheckForFile() {
        try {
            let ret = await Filesystem.readdir({
                path: '',
                directory: Directory.Data
            });
            //console.log(ret)
    
            if (this.verifyIfExists('collection.json', ret.files)) {
                Filesystem.readFile({
                    path:"collection.json",
                    directory: Directory.Data,
                    encoding: Encoding.UTF8
                })
                .then(
                    (value) => {
                        this.collection = JSON.parse(value.data)
                        //console.log("File Found")
                        this.onLoad()
                    }
                )
                .catch(
                    (err) => console.error(err)
                )
            }
            else {
                this.saveCollection()
                this.onLoad()
            }
        } 
        catch(e) {
            //console.log('Unable to read dir: ' + e);
        }
    }

    verifyIfExists(ITEM, LIST) {
        let verification = false;
        for (const i of LIST) {
            if (i === ITEM) {
                verification = true;
                break;
            }
        }
        return verification;
    }
}
export default new dataset(Collection)
///////////\\\\\///////////////////////\\\\\/////////\\\\\////////
///////////\\\\\///////////////////////\\\\\/////////\\\\\////////
///////////\\\\\///////////////////////\\\\\/////////\\\\\////////
///////////\\\\\///////////////////////\\\\\/////////\\\\\////////
///////////\\\\\///////////////////////\\\\\/////////\\\\\////////
///////////\\\\\///////////////////////\\\\\/////////\\\\\////////
///////////\\\\\///////////////////////\\\\\/////////\\\\\////////
///////////\\\\\///////////////////////\\\\\/////////\\\\\////////
///////////\\\\\///////////////////////\\\\\/////////\\\\\////////
///////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/////////\\\\\////////
///////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/////////\\\\\////////
///////////\\\\\///////////////////////\\\\\/////////\\\\\////////
///////////\\\\\///////////////////////\\\\\/////////\\\\\////////
///////////\\\\\///////////////////////\\\\\/////////\\\\\////////
///////////\\\\\///////////////////////\\\\\/////////\\\\\////////
///////////\\\\\///////////////////////\\\\\/////////\\\\\////////
///////////\\\\\///////////////////////\\\\\/////////\\\\\////////
///////////\\\\\///////////////////////\\\\\/////////\\\\\////////
///////////\\\\\///////////////////////\\\\\/////////\\\\\////////
///////////\\\\\///////////////////////\\\\\/////////\\\\\////////
///////////\\\\\///////////////////////\\\\\/////////\\\\\////////
///////////\\\\\///////////////////////\\\\\/////////\\\\\////////