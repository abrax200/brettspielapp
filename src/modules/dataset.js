import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import Collection from "./data_new.json"

class dataset{

    constructor(collection){
        this.collection = Collection
        this.onLoad = () => {}
        this.onDelete = () => {}
        this.CheckForFile()
    }

    addJSONtoCollection(json){
        this.collection.games.push(json)
        this.saveCollection()
    }


    games(){
        const val = []
        for (const game of this.collection.games){
            val.push(game.name)
        }
        val.sort()
        return val
    }


    game(name){
        const game = this.collection.games.find(e => e.name === name)
        return game
    }

    getAllOfCriteria(criteria){
        var possibilities = []

        for (const game of this.collection.games){
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

        for (const game of this.collection.games){
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

    matchesCriteria(game, criteriaName, valueOfCriteria){
        const compareOperators = {
            "=": (a, b) => a === b,
            ">=": (a, b) => a >= b,
            ">": (a, b) => a > b,
            "<=": (a, b) => a <= b,
            "<": (a, b) => a < b,
            "_contains_": (a, b) => b.every((e) => a.includes(e)),
        }

        const valueOfGame = game[criteriaName]
        const criteria = this.collection.criterias.find(e => e.name === criteriaName)
        
        const valDict = {
            a:valueOfCriteria,
            b:valueOfGame,
            a_min:valueOfCriteria[0],
            a_max:valueOfCriteria[1],
            b_min:valueOfGame[0],
            b_max:valueOfGame[1],
        }

        const operatorRegEx = /=|>=|>|<=|<|_contains_/g
        const valRegEx = /(?<![A-Za-z])(a(?!_min|_max)|b(?!_min|_max)|a_min|a_max|b_min|b_max)(?![A-Za-z])/g

        const operators = criteria.matches_if.match(operatorRegEx)
        const vals = criteria.matches_if.match(valRegEx)

        let matches = true

        for (let i = 0; i < operators.length; i++){
            const operator = operators[i]
            const val1 = valDict[vals[i]]
            const val2 = valDict[vals[i+1]]

            console.log(criteriaName, valueOfCriteria, valueOfGame, operator,  compareOperators[operator], val1, val2, compareOperators[operator](val1, val2))
            matches = compareOperators[operator](val1, val2) && matches
        }

        return(matches)
    }

    hasCriterias(criterias){
        var foundGames = [] 
        for (const game of this.collection.games){
            //Das ding stellt im wesentlichen sicher das alle Kriterien erfüllt sind
            
            var matchesAllCheckedCriterias = true
            for (const criteria in criterias){
                const val = criterias[criteria]
                const matchesThisCriteria = this.matchesCriteria(game, criteria, val)
                //console.log(criteria, val)
                //console.log(game, this.collection[game][criteria])
                ////console.log(matchesThisCriteria)
                matchesAllCheckedCriterias = matchesAllCheckedCriterias && matchesThisCriteria
            }
            if(matchesAllCheckedCriterias){
                foundGames.push(game.name)
            }
        }

        return foundGames.sort()
    }

    async newGame(game){
        this.collection.games.push(game)
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
        console.log(this)
        this.collection = {Collection}
        this.saveCollection()
        console.log(this.collection)
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
        this.collection.games = this.collection.games.filter((e) => e.name !== name)
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

    format2Type(type, str){
        let newstr = str
        switch(type){
            case "single_number":
                newstr = parseInt(str)
                break
            
            case "double_number":
                const splitstr = str.split(",")
                const ints = [parseInt(splitstr[0]), parseInt(splitstr[1])]
                newstr = ints
                break
            
            case "set":
                newstr = str.split(",")
                break
            
            case "bool":
                newstr = {"yes":true, "no":false}[str]
                break
            
            default:
                break
        }
        return newstr
    }

    csv2Collection(csv){
        const sheet = []

        for (const line of csv.split("\n")){
            sheet.push(line.replace(/ $/g, "").replace(/\r/, "").split(";"))
        }

        const c = {
            criterias:[],
            games:[]
        }
        const criterias = sheet[0]

        for (let i = 1; i < criterias.length; i++){
            c.criterias.push({
                name:           sheet[0][i],
                display:        sheet[1][i],
                filter_type_a:  sheet[2][i],
                stored_type_b:  sheet[3][i],
                question:       sheet[4][i],
                matches_if:     sheet[5][i],
            })
        }

        for (let i = 6; i < sheet.length; i++){
            const json = {}
            for (let j = 0; j < criterias.length; j++){
                json[criterias[j]] = this.format2Type(sheet[3][j], sheet[i][j])
            }
            c.games.push(json)
        }

        return(c)
    }
    
}

const d = new dataset()

export default d