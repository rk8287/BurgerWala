import React from 'react'
import '../../styles/footer.scss'
import {AiFillInstagram,AiFillGithub,AiFillLinkedin} from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
   <footer>

    <div>
      <h2>BCA FOOD WALA</h2>

      <p>we are trying to give you the best taste possible</p>

      <em>We give attention to geninum feedback </em>
      <strong>All right received @bcachaiwala</strong>
    </div>

    <aside>

    <h4>Follow Us</h4>

<Link className='link' to="#">
  <AiFillInstagram />
</Link>
<Link className='link' to="#">
  <AiFillGithub />
</Link>
<Link className='link' to="#">
  <AiFillLinkedin />
</Link>
    </aside>
   </footer>
  )
}

export default Footer