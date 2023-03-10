import React, { useState } from 'react'
import axios from "axios"
import Card from '../Components/Card.js'
import styled from 'styled-components'




export default function Weather() {

    const [wData,setWdata] = useState([])
    const [condition,setCondition] = useState([])
    const [location,setlocation] = useState([])
    const [input,setInput] = useState("")
    const [loading,setLoading] = useState(true)
    const [loadinge,setLoadinge] = useState("Enter A Vaild City")
    // const [city,setCity] = useState(false)


    

    const WeatherData = async()=>{
     if(input !== " "){
      setLoadinge("Loading...")
      setLoading(true)

     }


        await axios({
            method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: {q: input},
      headers: {
        'X-RapidAPI-Key': 'f56b491e85mshaba015d24328673p1a17b7jsnb53ae1e2238c',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
        }).then((res)=>{
            console.log(res.data)
            setWdata(res.data.current)
            setCondition(res.data.current.condition)
            setlocation(res.data.location)
            setLoading(false)
    
        })
    
    
    
    }

    const getweather =(e)=>{

      if (e.keyCode === 13) {
      setWdata([])
        setCondition([])
        setlocation([])
        setLoading(true)
        WeatherData()
        // setInput("")
    }

       
       



    }

    // useEffect(()=>{
    //     WeatherData()
      
    
    //   },[])
    const props ={image:`https:${condition.icon}`,temp:wData.temp_c, status:condition.text,city: location.name,feel:wData.feelslike_c,ws:wData.wind_kph,wd:wData.wind_dir,update:wData.last_updated,states:location.region,country:location.country}

  return (
    
    <Style>
        <div className='Nav'>

    <input type="text" value={input} onChange ={(e)=>setInput(e.target.value)} placeholder="Enter Your City" onKeyDown={getweather}/>
    {/* <input type="submit" onClick={getweather} /> */}
        </div>

        {}

{loading?<p>{loadinge}</p>:<Card {...props}/>}
        
</Style>
  )
}

const Style = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 40px;
.Nav{
  padding: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    input{
      padding: 10px;
      outline: none;
      border: 1px solid black;
      border-radius: 10px;
    }
    

   
}

`
