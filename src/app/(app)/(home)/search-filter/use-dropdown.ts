import { RefObject } from "react";

export const useDropdownPosition=( ref:RefObject<HTMLDivElement|null>|RefObject<HTMLDivElement>)=>{
    const getDropdownPosition=()=>{
        if(!ref.current) return {top:0, left:0};
        const rect=ref.current.getBoundingClientRect();
        const dropdownWidth=240;// width of dropdown (w-60=15 rem=240px)
        
        // caculate initialize  position
        let left=rect.left+window.scrollX;
        const top=rect.top +window.scrollY+20;

        // CHECK IF DROPDOWN WOULD GO OFF THE FIGHT EDGE OF TTHE VIEWPORT
         if (left +dropdownWidth>window.innerWidth){
            // Alight to right edge
            left=rect.right+window.scrollX;
            // if still off-screen, align to the right edge of viewprot with some padding
            if(left<0){
                left=window.innerWidth - dropdownWidth-16;
            }
         }
         // ensure dropdown doesn't go off left edge
         if(left<0){
            left=16;
         }
         return {left,top}
    }
    return { getDropdownPosition}
}