import React, { useState,useEffect,useMemo } from 'react'
import CountryCard from './CountryCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import PaginationComponent from './PaginationComponent';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Pass from './Pass'
import {Form} from 'react-bootstrap'
import Select from 'react-select';


function searchingFor(search){
    return function(x){
        return x.name.toLowerCase().includes(search.toLowerCase()) ||x.region.toLowerCase().includes(search.toLowerCase()) ||x.capital.toLowerCase().includes(search.toLowerCase()) || ! search;
    }

}
function Countries() {
    const[item,setItem]=useState([]);
    const[search,setSearch]=useState('');
    const[totalItems,setTotalItems]=useState(0)
    const[currentPage,setCurrentPage]=useState();
    const ITEM_PER_PAGE=15;
    const [continent,setContinent]=useState('');
    const [value,setValue]=useState();
      
      const change=(event)=>{
            setSearch(event.target.value)
            setValue(event.target.value)
           
      }
    useEffect(() => {
        
        fetch('https://restcountries.eu/rest/v2/all')
        .then(res=>res.json())
        .then(json=>{
            setItem(json)
        })
    }, [])
    const alerting=()=>{
        alert('hey',continent)
    }

    const Data=useMemo(() => {
        let computedItems=item;

        if(search){
            computedItems=computedItems.filter(searchingFor(search))
        }
        setTotalItems(computedItems.length)
        return computedItems.slice((currentPage-1)*ITEM_PER_PAGE,(currentPage-1)*ITEM_PER_PAGE+ITEM_PER_PAGE)
    }, [item,currentPage,search])

    return (
    <div>
        <div className="search">
            
        <h2>KNOW ABOUT THE COUNTRIES !!</h2>
        <TextField 
            id="outlined-search" 
            value={search}
           className="search_field"
            onChange={e=>setSearch(e.target.value)}
            setCurrentPage={1}
            label="Search Your Desired Country" type="search" variant="outlined"
            InputProps={{
                endAdornment:(
                    <InputAdornment  position="start">
                        <SearchIcon className="search_icon" style={{fontSize:'40px'}}/>
                    </InputAdornment>
                )
            }}
            />

        </div>
        <div>
        {/* <select value={continent}  onChange={e=>setContinent(e.target.value)}>
            <option value="grapefruit">Asia</option>
            <option value="lime">Europe</option>
            <option value="coconut">Africa</option>
            <option value="mango">Australia</option>
          </select>
                <button onClick={alerting}>Click</button> */}
             <div className="col-md-12 m-3 ml-auto mr-auto"><h5>Search Country By Region</h5>
             
             <select id="lang" style={{width:'200px'}} onChange={change} value={value}>
                  <option value="">All</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="Africa">Africa</option>
               </select>

             </div>


        </div>
        {!item?<CircularProgress color="secondary" style={{fontSize:'300px'}} />:(
                    <div className="row">
                        <CountryCard  item={Data} />
                    </div>
        )}  
        <div class="footer">
            
      <PaginationComponent
      total={totalItems}
      itemsPerpage={ITEM_PER_PAGE}
      currentPage={currentPage}
      onPageChange={page=>setCurrentPage(page)}
      />
        
        </div>
    </div>
    )
}

export default Countries
