import React, {useState, useEffect, useContext} from 'react'
import FavouriteContext from '../../LocaleContext';
import {gql, useQuery} from '@apollo/client'
import CharacterCard from '../../component/CharacterCard';
import './FavoritePage.css'
import { Link } from 'react-router-dom';

function FavoritePage(){
    const {favoritos, setFavoritos} = useContext(FavouriteContext)

    const CHARID_QUERY = gql`
        query SearchCharByID($ids:[ID!]!){
            charactersByIds(
                ids:$ids
            ){
                id
                name
                image
            }
        }
    `;

    const {loading,error,data} = useQuery(CHARID_QUERY, {
        variables:{
            ids: favoritos
        }
    })

    if(loading) return <div>Loading..</div>
    const characters = data.charactersByIds
    if (characters[0].id == null){
        return (
            <div>
                No Favoritos
            </div>
        )
    }

    return(
        <div className="char-container">    
            {characters?.map(character=>{
                const url = `/character/${character.id}`
                return(
                    <React.Fragment>
                        <div className="card char-card" key={character.id}>
                            <Link to={url}>
                                <img className="card-img-top clickable" src={character.image} alt="" />
                                <div className="card-body">
                                    <h3 className="card-title clickable">{character.name}</h3>
                                </div>
                            </Link>
                            <div className="card-img-overlay">
                            <button onClick={()=>{
                                setFavoritos(favoritos.filter(item=>item!==character.id))
                                }}>
                                <i className="fas fa-star fa-2x"></i>
                            </button>
                            {/* {
                                favoritos.find(favorito=>favorito==character.id)?
                                (
                                    <button onClick={()=>{
                                        setFavoritos(favoritos.filter(item=>item!==character.id))
                                        }}>
                                        <i className="fas fa-star"></i>
                                    </button>
                                ):(
                                    <button onClick={()=>{
                                        favoritos.push(character.id)
                                        setFavoritos(favoritos.slice())
                                        }}>
                                        <i className="far fa-star"></i>
                                    </button>
                                )
                            } */}
                            
                            </div>
                        </div>
                    </React.Fragment>
                    
                )
            })}
        </div>
    )
}

export default FavoritePage