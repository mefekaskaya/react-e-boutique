import React from "react";
import {Link} from "react-router-dom";
import PayPalButton from './PayPalButton';

export default function CardTotal({value, history})
{
    const {cardSubTotal, cardTax, cardTotal, clearCard} = value;
    return <React.Fragment>
               <div className="container">
                <div className="row">
                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize
                    text-right">
                        <Link to="/">
                            <button className="btn-outline-danger text-uppercase
                            mb-3 px-5" type="button" onClick={()=>clearCard()}>
                                clear card
                            </button>
                        </Link>
                        <h5>
                            <span className="text-title">subtotal : 
                                <strong>$ {cardSubTotal}</strong>
                            </span>
                        </h5>
                        <h5>
                            <span className="text-title">tax : 
                                <strong>$ {cardTax}</strong>
                            </span>
                        </h5>
                        <h5>
                            <span className="text-title">total : 
                                <strong>$ {cardTotal}</strong>
                            </span>
                        </h5>
                        <PayPalButton total={cardTotal} clearCard = {clearCard}
                        history = {history} />
                    </div>
                </div>
               </div>
           </React.Fragment>
    
}