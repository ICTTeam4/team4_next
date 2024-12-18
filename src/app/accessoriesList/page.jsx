'use client';
import React, { useState } from 'react';
import './accessoriesList.css';
import ItemCard from '../itemCard/page';
import FilterButtonsSection from '../filterButtonsSection/page';
import FilterSidebar from '../filterSidebar/page';
import MidCategoryBanner from "../midCategoryBanner/page";

function Page(props) {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  }

  return (
    <>
    <MidCategoryBanner category="accessoriesList"/>
    <FilterSidebar isActive={isSidebarActive} toggleSidebar={toggleSidebar}/>
    <FilterButtonsSection toggleSidebar={toggleSidebar}/>
    <div style={{display:'flex', justifyContent:'center', marginTop:'-10px'}}>
    <div className='main_list_container'>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    
    </div>
    </div>
    </>
  );
}

export default Page;