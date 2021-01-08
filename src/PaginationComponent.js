import React, { useState,useEffect,useMemo } from 'react'
import Pagination from 'react-bootstrap/Pagination'
import './Page.css'

const PaginationComponent=({total=0,itemsPerPage=10,currentPage=1,onPageChange})=> {
    const [totalPage,setTotalPage]=useState(0)
    useEffect(() => {
        if(total>0 && itemsPerPage>0){
            setTotalPage(Math.ceil(total/itemsPerPage));

        }
        
    }, [total,itemsPerPage])

    const paginationItem=useMemo(() =>{
        const pages=[];
        for(let i=1;i<=totalPage;i++){
          pages.push(  <Pagination.Item key={i} active={i===currentPage} onClick={()=>onPageChange(i)}>{i}</Pagination.Item>
          )     
        }
        return pages
    },[totalPage,currentPage])

    if(totalPage===0) return null

    return (
      <div className="pagination">
          
        <Pagination>
                <Pagination.Prev  onClick={()=>onPageChange(currentPage-1)} disabled={currentPage===1}/>
                {paginationItem}
                <Pagination.Next  onClick={()=>onPageChange(currentPage+1)} disabled={currentPage===totalPage} />
        </Pagination>
    
      </div>
    )
}

export default PaginationComponent
