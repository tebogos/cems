import React from 'react'
import { Link } from 'react-router-dom'

export default (props) => (
  <div>
    <Link className="link-space" to='/'>All</Link>
    <Link className="link-space" to='/active'>Active</Link>
    <Link className="link-space" to='/completed'>Completed</Link>
  </div>
)
