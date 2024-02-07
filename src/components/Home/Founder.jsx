import React from 'react'
import '../../styles/founder.scss'
import me from '../../assets/professional.jpg'
import '../../styles/founder.scss'

const Founder = () => {
  return (
   
    <section className='founder'>

    <div>
        <img src={me} alt="" />

        <h3>Raunak Singh</h3>

        <p>Hey, Everyone I am  Raunak Singh, the founder of Bca food Wala. <br />
        Our aim is to create the most tasty food on world
        </p>
    </div>
    </section>
  )
}

export default Founder