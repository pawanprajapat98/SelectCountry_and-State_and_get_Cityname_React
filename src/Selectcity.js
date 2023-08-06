    import React, { useEffect, useState } from 'react'

function Selectcity() {
    const [data,setdata]= useState([]);
    const [countryid,setcountryid]=useState('')
    const [state,setstate]=useState([]);
    const [stateid,setstateid]=useState('')
    const [city,setcity]=useState([]);
     

    // select country.push...................................... 
  
    var countryheaders = new Headers();
     
    countryheaders.append("X-CSCAPI-KEY","TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==");
  
    var requestOptions = {
    method: 'GET',
    headers: countryheaders,
    redirect: 'follow'
    };

    useEffect(()=>{
        fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            setdata(result);
        })
        .catch(error => console.log('error', error));
       },[])
    // select state.push...................................... 
    
    var stateheaders = new Headers();
    stateheaders.append("X-CSCAPI-KEY", "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==");
  
    var requestOptions = {
    method: 'GET',
    headers: stateheaders,
    redirect: 'follow',
    };

    useEffect(()=>{
        if(countryid){
         fetch(`https://api.countrystatecity.in/v1/countries/${countryid}/states`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            setstate(result);
        })
        .catch(error => console.log('error', error));
    }
    },[countryid])
 
       
  //  select city.push......................... 

  var cityheaders = new Headers();
  cityheaders.append("X-CSCAPI-KEY", "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==");

  var requestOptions = {
  method: 'GET',
  headers: cityheaders,
  redirect: 'follow'
  };

  useEffect(()=>{
    if(stateid){
    fetch(`https://api.countrystatecity.in/v1/countries/${countryid}/states/${stateid}/cities`,requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        setcity(result);
    })
    .catch(error => console.log('error', error));
    }    
  },[stateid])
      


  
  return (
    <div>
       
        <div className='container'>
          <div className='head'>
          <h1>Select country and State and get city name</h1>
          </div>
          <div className='list-one'>
          
                <select onChange={(e)=>(setcountryid(e.target.value))}>
                        <option selected disabled >Select country</option>
                            {
                                data.map((country,index) => {
                                    return <option value={country.iso2}  key={index}> {country.name}</option>
                                })
                            }
                   </select>
        </div>
      
       <div className='list-one'>  
            <select onChange={(e)=>(setstateid(e.target.value))}>
                    <option selected disabled >Select state</option>
                        {
                            state.map((state,index) => {
                                return <option key={index} value={state.iso2}>{state.name}</option>
                            })
                        }
               </select>
      </div>  
      <div className='list-one'>
        <select>
            <option selected disabled >Select city</option>
                {
                    city.map((city,index) => {
                        return <option key={index}>{city.name}</option>
                    })
                }
        </select>   
     </div>
     </div> 
    </div>
  )
}

export default Selectcity




