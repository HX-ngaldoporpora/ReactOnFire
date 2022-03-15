import React, {useEffect, useState} from "react";
import LinkForm from "./LinkForm";
import db from '../firebase'
import { addDoc, collection, getDocs, onSnapshot, doc, deleteDoc } from "firebase/firestore";

 const Links = () => {

   const [links, setLinks] = useState([])


   const addOrEditLink = async (linkObject) => {
     //voy a guardar o editar los datos en DB de Firebase   
   await addDoc(collection(db, 'links'),
   (linkObject))
     //collection es una funcion que me da Firebase, para generar mi db
   console.log("new task added")
    }

    const onDeleteLink = async (id) => {
if (window.confirm("are you sure that you want to delete?")) {
    await deleteDoc(doc(db, "links", id ))
    console.log("task deleted")
}
    }

    const getLinks = async () => {
        //onSnapShot para que se actualice en tiempo real
       const querySnapShot = await getDocs(collection(db, "links"))//.onSnapshot((querySnapShot) => {
        const docs = []
        querySnapShot.forEach( (doc) => {
            docs.push({...doc.data(), id: doc.id})
         console.log(docs)
        })
       //});
       setLinks(docs);
      }


    useEffect(
        ()=> 
      onSnapshot(collection(db, "links"), () => {
        getLinks()
          //setLinks(snapshot.docs.map(doc => doc.data()))
       })
        , [])

    return ( 
    <div>
        <div className="col-md-8 p-2"> 
        <LinkForm addOrEditLink = {addOrEditLink}/>
        </div>
        <div className="col-md-8 p-2">
            {links.map((link)=>(
                <div className="card mb-1" key={link.id}>
                    <div className="card-body">
                 <div className="d-flex justify-content-between">  
                     <h4> {link.name} </h4> 
                 <i className="material-icons text-danger" onClick={() => onDeleteLink(link.id)}>close</i>
                 </div>
                  <p>{link.description}</p> 
                  <a href={link.url} target="_blank"> 
                    {link.url}
                  </a>
                        </div>
                    </div> 
            ))}
            
            
            
               </div>
    </div>
    )
}

export default Links