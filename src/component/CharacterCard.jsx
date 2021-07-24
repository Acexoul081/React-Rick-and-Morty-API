import { Link } from 'react-router-dom';
import './CharacterCard.css'

function CharacterCard(props){
    const character = props.character;
    const url = `/character/${character.id}`
    return(
        <Link to={url} className="card char-card" key={character.id}>
            <img className="card-img-top" src={character.image} alt="" />
            <div className="card-body">
                <h3 className="card-title">{character.name}</h3>
            </div> 
        </Link>
    )
}

export default CharacterCard