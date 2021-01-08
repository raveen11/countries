import React,{useEffect} from 'react'
import './Card.css'
import Aos from 'aos'
import "aos/dist/aos.css"

function CountryCard({item}){
    useEffect(() => {
        Aos.init({duration:1000})
     }, [])
     
     
	
    return (
            <div className="ml-auto mr-auto">
                {item.map(i=>(
                            <div key={i.id} class="container" data-aos="fade-up">
                            <div class="flipper">
                            <div class="front">
                                <img  src={i.flag} alt="cherry blossoms"/>
                                <p class="caption">{i.name}</p>
                            </div>
                            <div class="back">
                                <a href={"https://en.wikipedia.org/wiki/"+i.name} target="_blank">
                                <h1>{i.name}</h1>
                                </a>
                                <p class="date">Capital: {i.capital}</p>
                                
                                <p>Region: <span>{i.region}</span></p>
                                <p>SubRegion: <span>{i.subregion}</span></p>
                                <p>Total Population: <span>{i.population}</span></p>
                                <p>Total Area: <span>{i.area}&nbsp;Sqft</span></p>
                                <p>Native Name: <span>{i.nativeName}</span></p>
                            </div>
                            </div>
                        </div>
                ))
                }
                </div>
    )
}

export default CountryCard
