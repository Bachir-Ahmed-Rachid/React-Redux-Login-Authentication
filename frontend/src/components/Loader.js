import React from 'react'

import { Oval } from  'react-loader-spinner'
const Loader = () => {
  return (
    <Oval
        height={100}
        width={100}
        color="black"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="white"
        strokeWidth={5}
        strokeWidthSecondary={2}

        />
  )
}

export default Loader