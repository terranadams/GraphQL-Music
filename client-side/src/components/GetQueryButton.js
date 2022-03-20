import React from 'react'

const GetQueryButton = (props) => {
  return (
    <button className="button" onClick={props.onClick}>Get some artists!</button>
  )
}

export default GetQueryButton