import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component
{
    state ={
        products : [],
        detailProduct : detailProduct,
        card : [],
        modalOpen : false,
        modalProduct : detailProduct,
        cardSubTotal : 0,
        cardTax : 0,
        cardTotal : 0
    };
    componentDidMount(){
        this.setProducts();
    }
    setProducts = () =>{
        let tempProducts = [];
        storeProducts.forEach(item =>{
            const singleItem = {...item};
            tempProducts = [...tempProducts,singleItem];
        })
        this.setState(()=>{
            return{products:tempProducts};
        })
    }

    getItem = (id) =>{
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = id =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {detailProduct:product}
        })
    };
    addToCard = (id) =>{
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(
            () => {
            return { products:tempProducts,
                card:[...this.state.card, product]
            };
        },
        () => {
           this.addTotals();
        }
        );
    };
    openModal = id => 
    {
        const product = this.getItem(id);
        this.setState(()=>{
            return {modalProduct:product,modalOpen:true}

        });
    };
    closeModal = () =>
    {
        this.setState(()=>{
            return {modalOpen:false}
        });
    };
    increment = (id) => {
        let tempCard = [...this.state.card];
        const selectedProduct = tempCard.find(item=>item.id === id);
        const index = tempCard.indexOf(selectedProduct);
        const product = tempCard[index];
        if(product.count < 3)
        {
            product.count = product.count + 1;
            
        }
        
        product.total = product.count * product.price;
        this.setState( () => {
            return{
                card:[...tempCard]}},
                () => 
                {
                    this.addTotals()
                });
    };
    decrement = (id) => {
        let tempCard = [...this.state.card];
        const selectedProduct = tempCard.find(item=>item.id === id);
        const index = tempCard.indexOf(selectedProduct);
        const product = tempCard[index];
        product.count = product.count - 1;
        if(product.count === 0)
        {
            this.removeItem(id);
        }
        else
        {
            product.total = product.count * product.price;
            this.setState(
                () => 
                {
                    return{
                        card:[...tempCard]}},
                        ()=>{
                            this.addTotals()
                        }
                        );
        }
    }
    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCard = [...this.state.card];

        tempCard = tempCard.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(()=>{
            return {
                card:[...tempCard],
                product:[...tempProducts]
            }
        },()=>{
            this.addTotals();
        })
    }
    clearCard = () =>{
        this.setState(()=>{
            return { car : [] };
        },()=>{
            this.setProducts();
            this.addTotals();
        });
    }
    addTotals = () =>{
        let subTotal = 0;
        this.state.card.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.18;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(()=>{
            return{
                cardSubTotal:subTotal,
                cardTax:tax,
                cardTotal:total
            }
        })
    }
    render(){
        return(
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail:this.handleDetail,
                addToCard:this.addToCard,
                openModal:this.openModal,
                closeModal:this.closeModal,
                increment:this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCard:this.clearCard
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
} 

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };