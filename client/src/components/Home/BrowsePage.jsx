import React from 'react'
import './browse.scss'
import { categories } from '../utils/Json/categories'
const BrowsePage = () => {
  return (
    <div id="browse">
      <h1>Categories</h1>
      <div id="categories">
        {
          Object.keys(categories).map((e,i)=>{
            return (e!=='mid')?<div className='cElm' key={categories[e].id}>
              <div className="cOvly"></div>
              <h1>{e}</h1>
              <img src={categories[e].picUrl} alt="" />
            </div>:<div id='cMid' key={categories[e].id}>
              <img src={categories[e].picUrl} alt="" />
            </div>
          })
        }
      </div>
    </div>
  )
}

export default BrowsePage