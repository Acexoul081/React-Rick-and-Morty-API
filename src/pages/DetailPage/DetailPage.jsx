import React, {useState, useEffect, useContext} from 'react'
import {useParams, Redirect} from 'react-router-dom'
import './DetailPage.css'
import {gql, useQuery} from '@apollo/client'
import CharacterCard from '../../component/CharacterCard';
import FavouriteContext from '../../LocaleContext';

function DetailPage(){
    let {id} = useParams();
    const {favoritos, setFavoritos} = useContext(FavouriteContext)

    // useEffect(()=>{

    // },[favoritos])
    const CHARINFO_QUERY = gql`
        query GetCharacter($n: ID!){
            character(id:$n){
            id
            name
            status
            species
            type
            gender
            origin{
                name
            }
            location{
                name
            }
            image
            }
        }
    `;

    const {loading,error,data} = useQuery(CHARINFO_QUERY, {
        variables:{
            n: id
        }
    })

    if(loading) return <div>Loading..</div>

    const character = data.character
    console.log(favoritos.find(favorito=>favorito==character.id))

    if(favoritos && favoritos.find(favorito=>favorito==character.id)){
        var button = <button onClick={()=>{
                    setFavoritos(favoritos.filter(item=>item!==character.id))
                    }}>
                    <i className="fas fa-star fa-2x"></i>
                </button>
    }else{
        var button =<button onClick={()=>{
                    favoritos.push(character.id)
                    setFavoritos(favoritos.slice())
                    }}>
                    <i className="far fa-star fa-2x"></i>
                </button>
    }
    
    
    return(
        <div className="detail-container">
            <CharacterCard character={character}/>
            <div className="card detail-info">
                <div className="card-body">
                    <h5 className="card-title">{character.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">#{character.id}</h6>
                    <p className="card-text">Gender: {character.gender}</p>
                    <p className="card-text">Location: {character.location.name}</p>
                    <p className="card-text">Origin: {character.origin.name}</p>
                    <p className="card-text">Species: {character.species}</p>
                    <p className="card-text">Status: {character.status}</p>
                    <p className="card-text">Type: {character.type}</p>
                    {button}
                </div>
            </div>
        </div>
        
    )
}

export default DetailPage