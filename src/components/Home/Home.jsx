import React from 'react'
import '../../styles/home.scss'
import Founder from './Founder'
import Menu from './Menu'


const Home = () => {
  return (
<>
<section className='home'>

<div 
 
>
  <h1>BCA RESTURENT WALA</h1>
  <p>Give youself a tasty food.</p>
</div>

<a href="/menu"  initial={{
    x: "-100%",
    opacity: 0
  }}
  
  whileInView={{
    x:"0",
    opacity:1
  }}

  transition={{
    delay:0.6
  }}>Explore Menu</a>
</section>

<Founder/>
<Menu/>
</>
  )
}

export default Home