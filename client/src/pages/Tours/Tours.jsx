import { Autocomplete, Button, FormControl, FormLabel, Grid, Input, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TourCard from '../../components/TourCard/TourCard'
import './Tours.css'

function Tours() {
    const [tours, setTours] = useState([])
    const [countries, setCountries] = useState()
    const [country, setCountry] = useState("")
    const [duration, setDuration] = useState("")
    const [durationCount, setDurationCount] = useState("")

    useEffect(() => {
        getTours()
        fetchCountries()
    }, [])

    async function getTours() {
        await axios.get(`http://localhost:8080/tour/`).then((res)=>{
            setTours(res.data)
        }).catch((error) => {
            alert("Failed to fetch tours")
            console.log(error)
        })
    }

    async function fetchCountries() {
        await axios.get("https://restcountries.com/v3.1/all").then((res)=>{
            setCountries(res.data)
        }).catch((error)=>{
            console.log(error)
        })
    }

    async function handleSearch() {
        // const result = tours.filter((tour) => 
        //     tour.duration.toLowerCase().includes(duration) 
        // )
        // setTours(result)
    }
    
    return (
        <div>
            <form className='row filter-area'>
                <div className='col-xl-4'>
                    <Autocomplete
                        onChange={(e, value) => { setCountry(value); handleSearch()}} size='small'
                        options={countries?.map((country) => country.name.common)}
                        renderInput={(params) => <TextField {...params} label="Country"/>}
                    />
                </div>
                <div className='d-flex justify-content-between pt-2 col-xl-3'>
                    <FormLabel>Tour length</FormLabel>
                    <Slider
                        style={{ width: '280px' }} min={0} max={30} valueLabelDisplay="auto"
                        onChange={(e,value) => {setDurationCount(value)}}
                    />
                </div>
                <div className='col-xl-1'>
                    <FormControl fullWidth>
                        <InputLabel size='small'>Duration</InputLabel>
                        <Select
                            size='small' label="Duration"
                            onChange={(e) => { setDuration(e.target.value); handleSearch() }}
                        >
                            <MenuItem value={'Days'}>Days</MenuItem>
                            <MenuItem value={'Weeks'}>Weeks</MenuItem>
                            <MenuItem value={'Months'}>Months</MenuItem>
                            <MenuItem value={'Years'}>Years</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className='col-xl-1'>
                    <Button type='submit' variant="contained" color="success">Search</Button>
                </div>
                <div className='col-xl-2'>
                    <Button onClick={() => {getTours()}} variant="outlined" color="error">Reset Filters</Button>
                </div>
            </form>
            <h1 className="text-uppercase my-5">Our tour packages</h1>
            <div className='container page-content-tours'>
                {tours.map((tour, index) => {
                    return (
                        <TourCard key={index} tour={tour}/>
                    )
                })}
            </div>
        </div >
    )
}

export default Tours