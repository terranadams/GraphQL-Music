import React from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_SPECIFIC_ARTIST } from '../queries/queries'

const GetSpecificArtistButton = () => {

  const [getSpecificArtist, {loading, data}] = useLazyQuery(GET_SPECIFIC_ARTIST, {
    variables: {id: 3}
  })

  if (data) console.log('Get SPECIFIC artist: ',data)

  const handleSubmit = (e) => {
    e.preventDefault()
    getSpecificArtist()
  }

  return (
    <form onSubmit={handleSubmit}>
        <button className='button'>Get Specific Artist</button>
    </form>
  )
}

export default GetSpecificArtistButton