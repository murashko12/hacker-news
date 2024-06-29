import React from 'react'
import { Item } from '../../types/Item'
import style from './itemNews.module.css'
const ItemNews: React.FC<Item> = (props) => {
    return (
        <div className={style.container}>
            <a href={props.url}>{props.title}</a>
            <p>
                Author: {props.by} | Score: {props.score} | Time: {new Date(
                    props.time * 1000
                ).toLocaleString()}
            </p>
        </div>
    )
}

export default ItemNews
