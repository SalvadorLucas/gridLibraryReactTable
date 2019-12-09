import React from 'react';
import Paginations from "../Pagination/Pagination.js";

export default function Example(props){

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
        if(props.pages <= 5){
            for(let i=0; i<props.pages; i++){
                if(i===props.currentPage){
                    pages.push({active:true, text:i+1, onClick:()=>{actionButton(i)}})
                }else{
                    pages.push({text:i+1, onClick:()=>{actionButton(i)}}) 
                }
            }
        }        
        else if(props.startPage===props.endPage){
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