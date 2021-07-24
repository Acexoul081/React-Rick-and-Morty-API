import React, {useState, useEffect} from 'react'
import {gql, useQuery} from '@apollo/client'
import CharacterCard from '../../component/CharacterCard';
import './ListPage.css'

function ListPage(){
    const page = 1
    const CHAR_QUERY = gql`
        query GetCharacters($n: Int!){
            characters(page:$n){
                info{
                    count
                    pages
                    next
                    prev
                }
                results{
                    id
                    name
                    image
                }
            }
        }
    `;

    const {loading,error,data} = useQuery(CHAR_QUERY, {
        variables:{
            n: page
        }
    })

    
    if(loading) return <div>Loading..</div>
    const characters = data.characters.results

    return(
        <React.Fragment>
            <div className="char-container">    
                {characters?.map(character=>{
                    return(
                        <CharacterCard character={character}/>
                    )
                })}
            </div>
        </React.Fragment>
        
    )
}

export default ListPage