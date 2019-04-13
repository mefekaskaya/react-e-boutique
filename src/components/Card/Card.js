import React, { Component } from 'react';
import Title from '../Title';
import CardColumns from "./CardColumns";
import EmptyCard from "./EmptyCard";
import {ProductConsumer} from "../../Context";
import CardList from "./CardList";
import CardTotal from "./CardTotal";

export default class Card extends Component
{
    render()
    {
        return(
           <section>
               <ProductConsumer>
                   {value => {
                       const {card} = value;
                       if(card.length > 0)
                        {
                            return (
                                <React.Fragment>
                                    <Title name="your" title="card" />
                                    <CardColumns />
                                    <CardList value = {value} />
                                    <CardTotal value = {value} history={this.props.history} />
                                </React.Fragment>
                            );
                        }
                        else
                        {
                            return <EmptyCard />;
                        }
                   }}
               </ProductConsumer>
             
           </section>
        )
    }
} 