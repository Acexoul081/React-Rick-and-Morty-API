import React, {useState, useEffect} from 'react'
import {gql, useQuery} from '@apollo/client'
import CharacterCard from '../../component/CharacterCard';
import './SearchPage.css'

function SearchPage(){
    const [searchQuery, setSearchQuery] = useState("")

    const SEARCH_CHAR= gql`
        query SearchCharaters($query: String!){
                characters(filter:{
                name:$query
                }){
                results{
                    id
                    name
                    image
                }
            }
        }
    `;

    const {loading,error,data} = useQuery(SEARCH_CHAR, {
        variables:{
            query: searchQuery
        }
    })

    if(loading) return (
        <React.Fragment>
            <div className="search-container">
                <input type="text" name="" id="" placeholder="Search Name" onChange={
                    (event)=>{
                        setSearchQuery(event.target.value)
                    }
                }/>
            </div>
            <div>Loading..</div>
        </React.Fragment>
        
    )
    const characters = data.characters.results
    return(
        <React.Fragment>
            <div className="search-container">
                <input type="text" name="" id="" placeholder="Search Name" onChange={
                    (event)=>{
                        setSearchQuery(event.target.value)
                    }
                }/>
            </div>
            
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

export default SearchPage