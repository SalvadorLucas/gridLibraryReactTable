import React from 'react';
import Paginations from "../Pagination/Pagination.js";

export default function Example(props){
    let startPage = 0
    let endPage = 5

    function actionButton(page){
        if(page>=0 && page<props.pages){
            props.onClick(page)
        }
    }

    function buildNumbers(){
        let pages = []
        if(props.pages===null){
            pageses=1
        }
        pages.push({text:'PREV', onClick:()=>{actionButton(props.currentPage-1)}})        
        if(props.startPage===props.endPage){
            pages.push({active:true, text:props.startPage, onClick:()=>{actionButton(props.startPage)}})
        }else{
            for(let i=props.startPage; i<props.endPage; i++){
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