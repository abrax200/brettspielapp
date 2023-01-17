import Dataset from "../../modules/dataset"
import FileUpload from "../../components/FileUpload/FileUpload.js"

function SettingsPage(){

    return(
        <>
        <button onClick={() => {Dataset.saveCollection()}}>Sammlung Speichern</button>
        <button onClick={() => {Dataset.deleteCollection()}}>Sammlung Löschen</button>
        {/* <input onChange={(e) => BGGSearch(e.target.value)}></input> */}
        
        <FileUpload></FileUpload>
        </>

    )

}
// async function BGGSearch(text){
//     const request = fetch("http://www.martineum-halberstadt.de/mobil/mobdaten/PlanKl20200903.xml")
//     await request
//     const xml = new window.DOMParser().parseFromString(request.then, "text/xml")
// }

export default SettingsPage