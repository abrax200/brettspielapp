import "./FileUpload.css"
import Dataset from "../../modules/dataset"

function FileUpload(){
    let url = "https://drive.google.com/u/0/uc?id=1F7sb1rRgtdsxs7QM_L1j8VxhUrTO08j0&export=download"

    return(
        <>
        <div>
        <input className="Fileupload_input" placeholder="URL zu CSV" type="text" onChange={(e) => url = e.currentTarget.value}/>
        <button className="Fileupload_button" onClick={() => {DriveFetch(url)}}>CSV Laden</button>
        <button className="Fileupload_button" onClick={() => {DriveFetch("https://drive.google.com/u/0/uc?id=1F7sb1rRgtdsxs7QM_L1j8VxhUrTO08j0&export=download")}}>Sammlung von Herrn Stober Laden</button>
        </div>
        </>
    )
}

async function DriveFetch(url){
    const request = await fetch(
        url,
        {
            method: 'GET',
            mode:"cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*",
                "Content-Type": "text/plain",

            },
        } 
    )

    const csv = await request.text()

    Dataset.collection = (Dataset.csv2Collection(csv))
    console.log(Dataset.csv2Collection(csv))
    Dataset.saveCollection()
    Dataset.CheckForFile()
    Dataset.onDelete()
    return(csv)

}

export default FileUpload