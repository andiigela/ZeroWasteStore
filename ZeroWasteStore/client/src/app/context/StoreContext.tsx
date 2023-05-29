import {Basket, BasketItem} from "../models/basket";
import {createContext, PropsWithChildren, useContext, useState} from "react";

interface StoreContextValue{
    basket : Basket | null;
    setBasket : (basket: Basket) => void;
    removeItem: (productId: number, quantity: number) => void;
    addItem: (productId: number, quantity: number) => void;
    
}
export const StoreContext=createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext(){
    const context = useContext(StoreContext);
    
    if(context===undefined){
        throw Error("Oops - we do not seem to be inside the provider");
    }
    return context;
}
export function StoreProvider({children}:PropsWithChildren<any>){
    const[basket, setBasket]= useState<Basket|null>(null);
    
    function removeItem(productId:number,quantity:number){
        if(!basket) return;
        const items=[...basket.items];
        const itemIndex = items.findIndex(i =>i.productId===productId);
        if(itemIndex >=0){
            items[itemIndex].quantity-=quantity;
            if(items[itemIndex].quantity===0) items.splice(itemIndex,1);
            setBasket(prevState => {
                return { ...prevState!, items }
            })
        }
    }
    function addItem(productId: number, quantity: number) {
        if (!basket) return;
        const items = [...basket.items];
        const itemIndex = items.findIndex(i => i.productId === productId);
        if (itemIndex >= 0) {
            items[itemIndex].quantity += quantity;
            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
            setBasket(prevState => {
                return { ...prevState!, items }
            })
        }
    }
    
    return(
<<<<<<< HEAD
        <StoreContext.Provider value={{ basket, setBasket, removeItem, addItem }}>
=======
        <StoreContext.Provider value={{basket,setBasket,removeItem,addItem }}>
>>>>>>> bbfd7ffc7d19fbc379c0c00f2e0dd80a92083fd4
            {children}
        </StoreContext.Provider>
    )
}