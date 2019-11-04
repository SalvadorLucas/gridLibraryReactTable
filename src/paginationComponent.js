import React from 'react';

import Paginations from "./components/Pagination/Pagination.js";


export default function Example(props){
    function actionButton(page){
        if(page>=0 && page<props.pages){
            props.onClick(page)
        }
    }

    function buildNumbers(){
        let pages = []
        let pageses = props.pages
        if(props.pages===null){
            pageses=1
        }
            pages.push({text:'PREV', onClick:()=>{actionButton(props.currentPage-1)}})        
            if(props.pages>10){
                //MAKE DYNAMIC PAGINATION
            }else{
                for(let i=0; i<pageses; i++){
                    if(i===props.currentPage){
                        pages.push({active:true, text:i+1, onClick:()=>{actionButton(i)}})
                    }else{
                        pages.push({text:i+1, onClick:()=>{actionButton(i)}}) 
                    }
                }
            }
            pages.push({text:'NEXT', onClick:()=>{actionButton(props.currentPage+1)}})
        return pages
    }

    if(props.pages!=null){
        return (
            <Paginations
            pages={buildNumbers()}
            color="success"
            />
        );
    }else{
        return null
    }
}