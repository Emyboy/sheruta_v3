import React from 'react'
import PropertyDetailsLeft from '../PropertyDetails/PropertyDetailsLeft'

export default function InspectionProperty( { data }) {
  return (
    <div>
      <PropertyDetailsLeft data={data?.property} standalone />
    </div>
  )
}
