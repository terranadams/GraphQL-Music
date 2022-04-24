import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_SPECIFIC_ARTIST } from '../queries/queries'

const GetSpecificArtistButton = () => {

  const [input, setInput] = useState()

  const [getSpecificArtist, {loading, data}] = useLazyQuery(GET_SPECIFIC_ARTIST, {
    variables: {id: parseInt(input)}
  })

  if (data) console.log('Get SPECIFIC artist: ',data)

  const handleSubmit = (e) => {
    e.preventDefault()
    getSpecificArtist()
    setInput('')
  }

  return (
    <form onSubmit={handleSubmit}>
        <input onChange={(e) => setInput(e.target.value)} value={input}></input>
        <button className='button'>Get Specific Artist</button>
    </form>
  )
}

export default GetSpecificArtistButton